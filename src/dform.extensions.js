/*
 * jQuery dform plugin
 * Copyright (C) 2012 David Luecke <daff@neyeon.com>, [http://daffl.github.com/jquery.dform]
 * 
 * Licensed under the MIT license
 */
(function($)
{
	var _getOptions = function(type, options)
		{
			return $.withKeys(options, $.keyset($.ui[type]["prototype"]["options"]));
		},
		_get = function(keys, obj) {
			for(var item = obj, i = 0; i < keys.length; i++) {
				item = item[keys[i]];
				if(!item) {
					return null;
				}
			}
			return item;
		}
		
	$.dform.addType("progressbar",
		/**
		 * Returns a jQuery UI progressbar.
		 *
		 * @param options  As specified in the jQuery UI progressbar documentation at
		 * 	http://jqueryui.com/demos/progressbar/
		 */
		function(options)
		{
			return $("<div>").dform('attr', options).progressbar(_getOptions("progressbar", options));
		}, $.isFunction($.fn.progressbar));

	$.dform.addType("slider",
		/**
		 * Returns a slider element.
		 *
		 * @param options As specified in the jQuery UI slider documentation at
		 * 	http://jqueryui.com/demos/slider/
		 */
		function(options)
		{
			return $("<div>").dform('attr', options).slider(_getOptions("slider", options));
		}, $.isFunction($.fn.slider));

	$.dform.addType("accordion",
		/**
		 * Creates an element container for a jQuery UI accordion.
		 *
		 * @param options As specified in the jQuery UI accordion documentation at
		 * 	http://jqueryui.com/demos/accordion/
		 */
		function(options)
		{
			return $("<div>").dform('attr', options);
		}, $.isFunction($.fn.accordion));

	$.dform.addType("tabs",
		/**
		 * Returns a container for jQuery UI tabs.
		 *
		 * @param options The options as in jQuery UI tab
		 */
		function(options)
		{
			return $("<div>").dform('attr', options);
		}, $.isFunction($.fn.tabs));

	$.dform.addType('modalTrigger',
		/**
		 * Returns an inline button which triggers a Bootstrap modal.
		 */
		function(options)
		{
			return $('<button type="button" class="btn btn-info" data-toggle="modal">').dform('attr', options);
		}, $.isFunction($.fn.button));

	$.dform.addType('modalResult',
		/**
		 *
		 */
		function(options)
		{
			return $('<div class="modal-result">').dform('attr', options);
		});

	$.dform.addType('header',
		/**
		 * Set the title of the form
		 */
		function(options)
		{
			return $('<div class="box-header">').dform('attr', options);
		});

	$.dform.addType('owner',
		/**
		 * Set the logo of the form
		 */
		function(options)
		{
			return $('<div id="form-owner">').dform('attr', options);
		});

	$.dform.addType('title',
		/**
		 * Set the title of the form
		 */
		function(options)
		{
			return $('<h1 class="title">').dform('attr', options);
		});

	$.dform.addType('sub',
		/**
		 * Set the sub title of the form
		 */
		function(options)
		{
			return $('<p class="sub">').dform('attr', options);
		});

	$.dform.addType('button',
		/**
		 * Set the sub title of the form
		 */
		function(options)
		{
			return $('<button class="btn">').dform('attr', options);
		});

	$.dform.addType('text-inline',
		/**
		 *
		 */
		function(options)
		{
			return $('<div class="form-group"><label for="' + options.input_id + '">' + options.label + '</label><input type="text" id="' + options.input_id + '" class="form-control" placeholder="' + options.label + '"></div>').dform('attr', options);
		});

	$.dform.addType('mathField',
		/**
		 * Math field
		 */
		function(options)
		{
			return $('<div class="form-group"><label for="' + options.input_id + '">' + options.label + '</label><input type="number" id="' + options.input_id + '" class="form-control mathField" placeholder="' + options.label + '"></div>').dform('attr', options);
		});

	$.dform.addType('summaryField',
		/**
		 * Math field
		 */
		function(options)
		{
			return $('<div class="form-group"><label for="' + options.input_id + '">' + options.label + '</label><input type="number" id="' + options.input_id + '" class="form-control summaryField" placeholder="' + options.label + '"></div>').dform('attr', options);
		});
	
	$.dform.subscribe("entries",
		/**
		 *  Create entries for the accordion type.
		 *  Use the <elements> subscriber to create subelements in each entry.
		 *
		 * @param options All options for the container div. The <caption> will be
		 * 	turned into the accordion or tab title.
		 * @param type The type. This subscriber will only run for accordion
		 */
		function(options, type) {
			if(type == "accordion")
			{
				var scoper = this;
				$.each(options, function(index, options) {
					var el = $.extend({ "type" : "div" }, options);
					$(scoper).dform('append', el);
					if(options.caption) {
						var label = $(scoper).children("div:last").prev();
						label.replaceWith('<h3><a href="#">' + label.html() + '</a></h3>');
					}
				});
			}
		}, $.isFunction($.fn.accordion));

	$.dform.subscribe("entries",
		/**
		 *  Create entries for the accordion type.
		 *  Use the <elements> subscriber to create subelements in each entry.
		 *
		 * @param options All options for the container div. The <caption> will be
		 * 	turned into the accordion or tab title.
		 * @param type The type. This subscriber will only run for accordion
		 */
		function(options, type) {
			if(type == "tabs")
			{
				var scoper = this;
				this.append("<ul>");
				var ul = $(scoper).children("ul:first");
				$.each(options, function(index, options) {
					var id = options.id ? options.id : index;
					$.extend(options, { "type" : "container", "id" : id });
					$(scoper).dform('append', options);
					var label = $(scoper).children("div:last").prev();
					$(label).wrapInner($("<a>").attr("href", "#" + id));
					$(ul).append($("<li>").wrapInner(label));
				});
			}
		}, $.isFunction($.fn.tabs));
		
	$.dform.subscribe("dialog",
		/**
		 * Turns an element into a jQuery UI dialog.
		 *
		 * @param options As specified in the [jQuery UI dialog documentation\(http://jqueryui.com/demos/dialog/)
		 */
		function(options)
		{
			this.dialog(options);
		}, $.isFunction($.fn.dialog));

	$.dform.subscribe("resizable",
		/**
		 * Make the current element resizable.
		 *
		 * @param options As specified in the [jQuery UI resizable documentation](http://jqueryui.com/demos/resizable/)
		 */
		function(options)
		{
			this.resizable(options);
		}, $.isFunction($.fn.resizable));

	$.dform.subscribe("datepicker",
		/**
		 * Adds a jQuery UI datepicker to an element of type text.
		 *
		 * @param options As specified in the [jQuery UI datepicker documentation](http://jqueryui.com/demos/datepicker/)
		 * @param type The type of the element
		 */
		function(options, type)
		{
			if (type == "text") {
				this.datepicker(options);
			}
		}, $.isFunction($.fn.datepicker));

	$.dform.subscribe("autocomplete",
		/**
		 * Adds the autocomplete feature to a text element.
		 *
		 * @param options As specified in the [jQuery UI autotomplete documentation](http://jqueryui.com/demos/autotomplete/)
		 * @param type The type of the element
		 */
		function(options, type)
		{
			if (type == "text") {
				this.autocomplete(options);
			}
		}, $.isFunction($.fn.autocomplete));

	$.dform.subscribe("[post]",
		/**
		 * Post processing subscriber that adds jQuery UI styling classes to
		 * text, textarea, password and fieldset elements as well
		 * as calling .button() on submit or button elements.
		 *
		 * Additionally, accordion and tabs elements will be initialized
		 * with their options.
		 *
		 * @param options All options that have been passed for creating the element
		 * @param type The type of the element
		 */
		function(options, type)
		{
			if (this.parents("form").hasClass("ui-widget"))
			{
				if ((type === "button" || type === "submit") && $.isFunction($.fn.button)) {
					this.button();
				}
				if (!!~$.inArray(type, [ "text", "textarea", "password",
						"fieldset" ])) {
					this.addClass("ui-widget-content ui-corner-all");
				}
			}
			if(type === "accordion" || type === "tabs") {
				this[type](_getOptions(type, options));
			}
		});
	
	$.dform.subscribe("[pre]",
		/**
		 * Add a preprocessing subscriber that calls .validate() on the form,
		 * so that we can add rules to the input elements. Additionally
		 * the jQuery UI highlight classes will be added to the validation
		 * plugin default settings if the form has the ui-widget class.
		 * 
		 * @param options All options that have been used for
		 * creating the current element.
		 * @param type The type of the *this* element
		 */
		function(options, type)
		{
			if(type == "form")
			{
				var defaults = {};
				if(this.hasClass("ui-widget"))
				{
					defaults = {
						highlight: function(input)
						{
							$(input).addClass("ui-state-highlight");
						},
						unhighlight: function(input)
						{
							$(input).removeClass("ui-state-highlight");
						}
					};
				}
				if (typeof (options.validate) == 'object') {
					$.extend(defaults, options.validate);
				}
				this.validate(defaults);
			}
		}, $.isFunction($.fn.validate));

		/**
		 * Adds support for the jQuery validation rulesets.
		 * For types: text, password, textarea, radio, checkbox sets up rules through rules("add", rules) for validation plugin
		 * For type <form> sets up as options object for validate method of validation plugin
		 * For rules of types checkboxes and radiobuttons you should use this subscriber for type form (to see example below)
		 *
		 * @param options
		 * @param type
		 */
	$.dform.subscribe("validate", function(options, type)
		{
			if (type != "form") {
				this.rules("add", options);
			}
		}, $.isFunction($.fn.validate));

	$.dform.subscribe("ajax",
		/**
		 * If the current element is a form, it will be turned into a dynamic form
		 * that can be submitted asynchronously.
		 *
		 * @param options Options as specified in the [jQuery Form plugin documentation](http://jquery.malsup.com/form/#options-object)
		 * @param type The type of the element
		 */
		function(options, type)
		{
			if(type === "form")
			{
				this.ajaxForm(options);
			}
		}, $.isFunction($.fn.ajaxForm));

	$.dform.subscribe('html',
		/**
		 * Extends the html subscriber that will replace any string with it's translated
		 * equivalent using the jQuery Global plugin. The html content will be interpreted
		 * as an index string where the first part indicates the localize main index and
		 * every following a sub index using getValueAt.
		 *
		 * @param options The dot separated html string to localize
		 * @param type The type of the this element
		 */
		function(options, type)
		{
			if(typeof options === 'string') {
				var keys = options.split('.'),
					translated = Globalize.localize(keys.shift());
				if(translated = _get(keys, translated)) {
					$(this).html(translated);
				}
			}
		}, typeof Globalize !== 'undefined' && $.isFunction(Globalize.localize));

	$.dform.subscribe('options',
		/**
		 * Extends the options subscriber for using internationalized option
		 * lists.
		 *
		 * @param options Options as specified in the <jQuery Form plugin documentation at http://jquery.malsup.com/form/#options-object>
		 * @param type The type of the element.
		 */
		function(options, type)
		{
			if(type === 'select' && typeof(options) === 'string') {
				$(this).html('');
				var keys = options.split('.'),
					optlist = Globalize.localize(keys.shift());
				if(optlist = _get(keys, optlist)) {
					$(this).dform('run', 'options', optlist, type);
				}
			}
		}, typeof Globalize !== 'undefined' && $.isFunction(Globalize.localize));

		getForm = function (getForm, formName, formMethod) {
			/**
			 * @param getForm is the name of the form you want to get
			 * @param formName is the name attribute the form element will recive
			 * @param formMethod is the method attribute the form element will recive
			 */

			$.ajax({
				url: getForm + '.json',
				dataType: 'json'
			})
			.always(function(chew) {
				jsonSpit(chew);
			});

			function jsonSpit (chew) {
				$('#modal-' + getForm + ' .modal-body').dform({
					'id' : formName,
					'name' : formName,
					'method' : formMethod,
					'class' : 'row',
					'html': chew
				});
			};
		};

		$.dform.subscribe('modal',
			function(options, type)
			{
				var modalContent = '';

				// Get a form via ajax, and put it into the modal
				// Use the form option to make this happen
				// If you want to, you can have modal with just normal html content
				// Just use the content option to put in normal content
				if (options.form) {
					getForm(options.form['get'], options.form['name'], options.form['method']);
				} else {
					var modalContent = options.content;
				}

				var modal = '<div class="modal fade" role="dialog">' +
								'<div class="modal-dialog modal-lg">' +
									'<div class="modal-content">' +
										'<div class="modal-header">' +
											'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
											'<h4 class="modal-title">' + options.heading + '</h4>' +
										'</div>' +
										'<div class="modal-body">' +
											modalContent +
										'</div>' +
										'<div class="modal-footer">' +
											'<button type="button" class="btn btn-default btn-md btn-primary modal-close" data-dismiss="modal">Lagre</button>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';

				if(type === 'modalTrigger') {
					$('body').append($(modal).dform('attr', options));
				}

				var modalId = options.id;
				var resultElement = modalId.replace('modal', 'result');

				$('#' + modalId).on('click', '.modal-close', function(event) {
					event.preventDefault();

					if ($('#' + resultElement).length) {
						$('#' + modalId + ' input').each(function(index, el) {
							$('#' + resultElement).append('<input type="text" id="' + resultElement + '_' + index + '" value="' + $(el).val() + '" disabled>');
						});
					};
				});

			}, $.isFunction($.fn.modal));

		$.dform.subscribe('icon',
			function(options, type)
			{
				if(type === 'button' || type === 'modalTrigger') {
					$(this).prepend('<span class="glyphicon glyphicon-' + options + ' left" aria-hidden="true"></span>');
				}
			}, $.isFunction($.fn.button));

		$.dform.subscribe('summarize',
			/*
			 * 
			**/
			function(options, type)
			{
				if(type === 'summaryField') {
					var values = [];
					var summaryField = $(this).children('input');

					// For every input field given in the summarize option
					// Summarize the value when any of them change
					$.each(options, function(index, val) {
						 $('#' + val).change(function(event) {
							event.preventDefault();
							values[index] = parseInt($('#' + val).val());

							var sum = values.reduce(function (previous, current) { return previous + current; }, 0);

							summaryField.val(sum);
						});
					});
				}
			});
})(jQuery);