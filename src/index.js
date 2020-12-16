require('./modernizr.min.js');

exports.Dom = (function() {
    
    class Dom
    {
        constructor(debug = false)
        {
        }

        /**
         * Document.querySelector shortcut.
         * Performing a single DOM query for an element
         * @param {String} selector
         * @returns {HTMLElement}
         */
        elm(selector)
        {
            if(typeof(selector) === "object") return selector;
            return document.querySelector(selector);
        }

        /**
         * Document.querySelectorAll shortcut.
         * Performing a DOM query for plural elements
         * @param selector
         * @returns {NodeList}
         */
        elms(selector)
        {
            if(typeof(selector) === "object") return [selector];
            return document.querySelectorAll(selector);
        }

        /**
         * Returns scrolling distance from the top.
         * @returns {number}
         */
        get scrollTop() { return window.pageYOffset || document.body.scrollTop; }

        /**
         * Returns the window inner width
         * @returns {number}
         */
        get winWidth(){ return window.innerWidth; }

        /**
         * Returns the window inner height
         * @returns {number}
         */
        get winHeight() { return window.innerHeight; }

        /**
         * Returns element's distance from the viewport top edge.
         * @param {string|HTMLElement} element
         * @returns {number}
         */
        fromTop(elem)
        {
            let box = this.absTop(elem);

            let body = document.body;
            let scrollTop = window.pageYOffset || body.scrollTop;

            return Math.round(box +  scrollTop - this.winHeight + 100);
        }

        /**
         * Return DOMRect object for the supplied element
         * @param {string} selector
         * @returns {DOMRect}
         */
        clientRect(selector) { return this.elm(selector).getBoundingClientRect(); }

        /**
         * Returns the element's absolute distance from the document top
         * @param {string|HTMLElement} element
         * @returns {number}
         */
        absTop(elem)
        {
            if(!elem) return 0;
            return elem.getBoundingClientRect().top;
        }

        /**
         * Returns the element's absolute distance from the document left edge
         * @param elem
         * @returns {Number}
         */
        absLeft(elem) { 
            if(!elem) return 0;
            return this.clientRect(elem).left; 
        }

        /**
         * Scroll viewport to the assigned point
         * @param {number} distance
         * @param {number} duration
         */
        scrollTo(distance, duration)
        {
            distance = (typeof(distance) == "undefined" ? 0 : distance);

            let scrollStep = -window.scrollY / (duration / 15);
            let scrollInterval = setInterval(() => {

                if(window.scrollY > distance)
                {
                    window.scrollBy(0, scrollStep);
                }
                else
                {
                    clearInterval(scrollInterval);
                }
            }, 15);
        }

        /**
         * Add CSS property to an element
         * @param {string|HTMLElement} selector
         * @param {string} key
         * @param {string} value
         * @returns {HTMLElement}
         */
        css(elm, key, value)
        {
            if(typeof(elm) === "string") elm = this.elm(elm);

            if(!selector) {
                console.warn("Unknown element for selector [", selector, "]");
                return null;
            }

            elm.style[key] = value;
            return elm;
        }

        /**
         * Creating a cookie
         * @param {string} name
         * @param {string} value
         * @param numberOfdays
         */
        cookie(name, value, numberOfdays)
        {
            var expires = "";

            if(numberOfdays) {
                let date = new Date();
                date.setTime(date.getTime() + (numberOfdays * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = name + "=" + value + expires + "; path=/";
        }

        /**
         * EventTarget.addEventListener() shortcut.
         * Add an event listener to an element or elements.
         * @param {string} selector
         * @param {string} eventName
         * @param {Function} callback
         */
        addListener(selector, eventName, callback)
        {
            let elm = (typeof selector === "string" ? this.elms(selector) : selector);

            if(elm instanceof NodeList){
                elm.forEach(element => element.addEventListener(eventName, callback, false));
            } else {
                if(elm && elm != null) elm.addEventListener(eventName, callback, false);
            }

            return elm;
        }

        /**
         * EventTarget.removeEventListener() shortcut.
         * Remove an event listener to an element or elements.
         * @param {string} selector
         * @param {string} eventName
         * @param {Function} callback
         */
        removeListener(selector, eventName, callback)
        {
            let elm = (typeof selector === "string" ? this.elms(elm) : selector);

            if(elm instanceof NodeList) {
                elm.forEach(element => element.removeEventListener(eventName, callback, false));
            } else {
                if(elm && elm != null) elm.removeEventListener(eventName, callback, false);
            }

            return elm;
        }

        /**
         * Add "animationend" event listener 
         * @param {string} selector
         * @param {Function} callback
         * @returns {*}
         */
        animationEnd(selector, callback)
        {
            let element = this.elm(selector);
            let eventName;

            let animationsEventNames = {
                "animation": "animationend",
                "OAnimation": "oAnimationEnd",
                "MozAnimation": "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            };

            eventName = animationsEventNames[Modernizr.prefixed('animation')];
            if(!eventName) return element;

            return this.addListener(element, eventName, callback);
        }

        /**
         * Add "transitionend" event listener 
         * @param {string} selector
         * @param {Function} callback
         * @returns {HTMLElement}
         */
        transitionEnd(selector, callback)
        {
            let element = this.elm(selector);
            let eventName;

            let transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'transition': 'transitionend'
            };

            eventName = transEndEventNames[ Modernizr.prefixed('transition') ];
            if(!eventName) return element;

            return this.addListener(element, eventName, callback);
        }

        /**
         * classList.toggle() shortcut. 
         * Toggle CSS class to/from an element
         * @param {string} selector
         * @param {string} className
         * @returns {Promise<HTMLElement>}
         */
        toggleClass(selector, className)
        {
            return new Promise(resolve => {

                let elms = this.elms(selector);
                elms.forEach(element => element.classList.toggle(className));

                resolve(elms);
            });
        }

        /**
         * classList.add() shortcut. 
         * Add CSS class to an element (one or many)
         * @param selector
         * @param className
         * @returns {Promise<HTMLElement>}
         */
        addClass(selector, className)
        {
            return new Promise(resolve => {

                let elms = this.elms(selector);
                elms.forEach(element => element.classList.add(className));

                resolve(elms);
            });
        }

        /**
         * classList.remove() shortcut.
         * Remove CSS class from an element (one or many)
         * @param selector
         * @param className
         * @returns {Promise}
         */
        removeClass(selector, className)
        {
            return new Promise(resolve => {

                let elms = this.elms(selector);
                elms.forEach(element => element.classList.remove(className));

                resolve(elms);
            })
        }

        /**
         * SVGPathElement.getTotalLength() shortcut. 
         * Returns the user agent's computed value for the total length of the path in user units.
         * @param {string} selector
         * @returns {number}
         */
        pathLen(selector)
        {
            let elm = this.elm(selector);

            if(!elm || elm == null)
            {
                console.warn("Unknown SVGPathElement for selector [", selector, " ]. Return 0 as lenght.");
                return 0;
            }

            if(!elm['getTotalLength']) 
            {
                console.warn("Shape for selector [", selector, " ] is not SVGPathElement. Return 0 as lenght.");
                return 0;
            }

            return elm.getTotalLength();
        }

        /**
         * Returns the element computed height as number
         * @param {string|HTMLElement} selector
         * @returns {Number}
         */
        height(selector)
        {
            if(typeof(selector) == "string") selector = this.elm(selector);

            let heightStr = getComputedStyle(selector).height;
            return parseInt(heightStr.replace("px", ""));
        }

        /**
         * Returns element height center point
         * @param {string|HTMLElement} selector
         * @returns {number}
         */
        heightCenter(selector) { return this.height(selector) / 2; }

        /**
         * Returns the element computed width as number
         * @param {string|HTMLElement} selector
         * @returns {number}
         */
        width(selector)
        {
            if(typeof(selector) == "string") selector = this.elm(selector);

            let widthStr = getComputedStyle(selector).width;
            return parseInt(widthStr.replace("px", ""));
        }

        /**
         * Returns element width center point
         * @param element
         * @returns {number}
         */
        widthCenter(element) { return this.width(element) / 2; }

        /**
         * Hide element using CSS >> block: none;
         * @param {string|HTMLElement} selector
         * @param {boolean} softHide - use for "visibility: none;"
         * @return {null|HTMLElement}
         */
        hide(selector, softHide = false)
        {
            if(softHide) return this.css(selector, "visibility", "none");
            return this.css(selector, "display", "none");
        }

        /**
         * Show element using CSS >> block: block|inline|grid|flex|inline-flex;
         * @param {string|HTMLElement} selector
         * @param {string} displayType
         * @returns {HTMLElement}
         */
        show(selector, displayType)
        {
            if(!displayType) displayType = "block";

            this.css(selector, "display", displayType);
            return this.css(selector, "visibility", "visible");
        }
    }

    return Dom;
})()