(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ContactForm = factory();
    }
}(this, function () {
    'use strict';

    var ContactForm = function (target) {
        if (!this || !(this instanceof ContactForm)) {
            return new ContactForm(target);
        }

        this.form = target instanceof Node ? target : document.querySelector(target);

        if (this.form === null) {
            return;
        }

        this.init();
    };

    ContactForm.prototype = {
        hasClass: function (el, name) {
            return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
        },
        addClass: function (el, name) {
            if (!this.hasClass(el, name)) {
                el.className += (el.className ? ' ' : '') + name;
            }
        },
        addError: function (el) {
            return this.addClass(el.parentNode, 'has-error');
        },
        removeClass: function (el, name) {
            if (this.hasClass(el, name)) {
                el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
            }
        },
        validate: function () {
            var elements = Array.prototype.slice.call(document.querySelectorAll('.form-control'));

            this.form.addEventListener('submit', function(e) {
                if (!e.target.checkValidity()) {
                    e.preventDefault();

                    elements.forEach(function(element) {
                        if (this.hasClass(element.parentNode, 'has-error')) {
                            this.removeClass(element.parentNode, 'has-error');
                        }
                    }.bind(this));

                    var hasError = false,
                        name     = document.querySelector('[name="name"]'),
                        email    = document.querySelector('[name="email"]'),
                        subject  = document.querySelector('[name="subject"]'),
                        message  = document.querySelector('[name="message"]'),
                        testmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    if (name.value.trim() === '') {
                        hasError = true;
                        this.addError(name);
                    }

                    if (!testmail.test(email.value)) {
                        hasError = true;
                        this.addError(email);
                    }

                    if (subject && subject.value.trim() === '') {
                        hasError = true;
                        this.addError(subject);
                    }

                    if (message.value.trim() === '') {
                        hasError = true;
                        this.addError(message);
                    }

                    if (hasError) {
                        e.preventDefault(); // Hatalı durumda form gönderimini durdur
                    } else {
                        this.form.submit(); // Hatalar yoksa formu gönder
                    }
                }
            }.bind(this), false);
        },
        init: function () {
            document.addEventListener('DOMContentLoaded', this.validate.bind(this), false);
        }
    };

    return ContactForm;
}));
