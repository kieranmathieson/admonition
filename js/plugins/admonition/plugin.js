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
      editor.addContentsCss( this.path + 'css/extra.css' );
      editor.addContentsCss( this.path + 'css/hint.css' );
      editor.addContentsCss( this.path + 'css/note.css' );
      editor.addContentsCss( this.path + 'css/troubleshoot.css' );
      editor.addContentsCss( this.path + 'css/warning.css' );
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
          if ( this.element.hasClass( 'admonition-extra' ) ) {
            this.setData('style', 'extra');
          }
          if ( this.element.hasClass( 'admonition-hint' ) ) {
            this.setData('style', 'hint');
          }
          if ( this.element.hasClass( 'admonition-note' ) ) {
            this.setData('style', 'note');
          }
          if ( this.element.hasClass( 'admonition-troubleshoot' ) ) {
            this.setData('style', 'troubleshoot');
          }
          if ( this.element.hasClass( 'admonition-warning' ) ) {
            this.setData('style', 'warning');
          }

        }, //End init().
        /**
         * Called when initialing widget display in CK, and when
         * data is returned by the dialog.
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
            icon.setAttribute('src', this.path + 'icons/' + this.data.style + '.png')
                .setAttribute('title', capitalizeFirstLetter(this.data.style));
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
