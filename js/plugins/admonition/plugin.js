/**
 * Created by kieran on 8/5/16.
 */


(function ($) {


  CKEDITOR.plugins.add('admonition', {
    requires: 'widget',
    icons: 'admonition',
    init: function (editor) {
      var path = this.path;
      editor.addContentsCss( this.path + 'css/base.css' );
      editor.widgets.add('admonition', {
        path: path,
        button: 'Add an admonition to the reader',
        dialog: 'admonitionDialog',
        template: '<div class="admonition">' +
        '<img class="admonition-icon">' +
        '<div class="admonition-content"><p>Content...</p></div>' +
        '</div>',
        //Define the editable pieces of the template.
        editables: {
          content: {
            selector: '.admonition-content'
          }
        },
        //Add to content that ACF will allow.
        allowedContent:
            'div(!admonition){width}; img(admonition-icon);'
              + 'div(!admonition-content); h2(!admonition-title)',
        requiredContent: 'div(admonition)',
        upcast: function( element ) {
          return element.name == 'div' && element.hasClass( 'admonition' );
        },
        init: function() {
          var width = this.element.getStyle( 'width' );
          if ( width ) {
            //Strip of last character if it's a %.
            if ( width.slice(-1) == '%' ) {
              width = width.slice(0, -1)
            }
            this.setData('width', width);
          }
          if ( this.element.hasClass( 'admonition-left' ) ) {
            this.setData('align', 'left');
          }
          if ( this.element.hasClass( 'admonition-right' ) ) {
            this.setData('align', 'right');
          }
          if ( this.element.hasClass( 'admonition-center' ) ) {
            this.setData('align', 'center');
          }
          //Admonition style.
          if ( this.element.hasClass( 'attention' ) ) {
            this.setData('style', 'attention');
          }
          if ( this.element.hasClass( 'warning' ) ) {
            this.setData('style', 'warning');
          }
          if ( this.element.hasClass( 'note' ) ) {
            this.setData('style', 'note');
          }

        }, //End init().
        /**
         * Called when data is returned by the dialog.
         */
        data: function() {
          //Get the icon element.
          var icon = this.element.find('img.admonition-icon').getItem(0);
          //Remove existing classes, styles, and attributes.
          //Width.
          this.element.removeAttribute('width');
          //Alignment.
          this.element.removeClass( 'admonition-left' );
          this.element.removeClass( 'admonition-right' );
          this.element.removeClass( 'admonition-center' );
          //Type
          this.element.removeClass( 'admonition-extra' );
          this.element.removeClass( 'admonition-hint' );
          this.element.removeClass( 'admonition-note' );
          this.element.removeClass( 'admonition-troubleshoot' );
          this.element.removeClass( 'admonition-warning' );
          //Icon image.
          if ( icon ) {
            icon.removeAttributes(['src', 'alt']);
          }
          //Add new stuff.
          if ( this.data.width ) {
            this.element.setStyle('width', this.data.width + '%');
          }
          if ( this.data.align ) {
            this.element.addClass('admonition-' + this.data.align);
          }
          if ( this.data.style ) {
            this.element.addClass('admonition-' + this.data.style);
            //Add style-specific CSS.
            editor.addContentsCss( this.path + 'css/' + this.data.style + '.css' );
          }
          if ( icon && this.data.style ) {
            //Show the right icon.
            icon.setAttribute('src', this.path + 'icons/' + this.data.style + '.png');
            icon.setAttribute('alt', capitalizeFirstLetter(this.data.style));
          }
        }
      });
      editor.ui.addButton( 'admonition', {
        label: 'Admonition',
        command: 'admonition'
      } );
      CKEDITOR.dialog.add( 'admonitionDialog', this.path + 'dialogs/admonition.js' );
      function capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  });

})(jQuery);
