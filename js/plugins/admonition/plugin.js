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
        dialog: 'admonition',
        //Get the HTML template from the editor object.
        template: editor.config.admonition_template,
        //Define the editable pieces of the template.
        editables: {
          content: {
            selector: '.admonition-content'
          }
        },
        //Add to content that ACF will allow.
        allowedContent:
            'div(!admonition,!admonition-*);'
              + 'img(!admonition-*);'
              + 'div(!admonition-content);',
        requiredContent: 'div(admonition)',
        upcast: function( element ) {
          return element.name == 'div' && element.hasClass( 'admonition' );
        },
        init: function() {
          //Width
          if ( this.element.hasClass( 'admonition-quarter' ) ) {
            this.setData('width', 'quarter');
          }
          if ( this.element.hasClass( 'admonition-half' ) ) {
            this.setData('width', 'half');
          }
          if ( this.element.hasClass( 'admonition-full' ) ) {
            this.setData('width', 'full');
          }
          //Alignment
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
          var icon = this.element.find('img').getItem(0);
          //Remove existing classes, styles, and attributes.
          //Width.
          this.element.removeClass( 'admonition-quarter' );
          this.element.removeClass( 'admonition-half' );
          this.element.removeClass( 'admonition-full' );
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
            this.element.addClass('admonition-' + this.data.width);
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
                .setAttribute('title', capitalizeFirstLetter(this.data.style))
                .setAttribute('alt', capitalizeFirstLetter(this.data.style))
                .addClass('admonition-icon');
          }
        }
      });
      editor.ui.addButton( 'admonition', {
        label: 'Admonition',
        command: 'admonition'
      } );
      CKEDITOR.dialog.add( 'admonition', this.path + 'dialogs/admonition.js' );
      function capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  });

})(jQuery);
