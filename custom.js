var suppliedCode = function() {
  function getuserinfo(){
    var displayimg = $('.img-circle').attr('src');
    console.log(displayimg);
    return displayimg;
  }

  function generate_id() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }

  var lang = {
    justnow: "Ahorrita"
  }

  var annData = function () {
    return {
      beforeAnnotationCreated: function (ann) {
        ann.updated = lang.justnow;
        ann.user_name = $('._Ge5b6Xz-H').text();
        ann.id = generate_id();
        ann.user_id = $('.si-mus').val();
        ann.uri = window.location.href;
        ann.displayimg = getuserinfo();
        console.log(ann.username)
        console.log(ann.user_id)
        console.log(ann.uri)
        console.log(ann.updated)
      }
    };
  };

  var app = new annotator.App();
  app.include(annData),
  app.include(annotator.ui.main, {
    element: document.querySelector('.letras_details'),
    editorExtensions: [annotator.ui.tags.editorExtension],
    viewerExtensions: [
      annotator.ui.tags.viewerExtension,
      addUserToUI
    ]
  });

  app.start()
  .then(function () {
    app.ident.identity = $('._Ge5b6Xz-H').text();
    console.log("user is " + app.ident.who());
    app.annotations.load({uri: window.location.href})
  })

  function addUserToUI(viewer) {
    viewer.addField({
        load: function (field, annotation) {
          console.log('hey!')
          field = $(field);
          field.text(annotation.user_name)
        }
    })
      // beforeAnnotationCreated: function(field, annotation) {
      //   field = $(field);
      //   if (annotation.user_name) {
      //     return field.text(ann.username);
      //   } else {
      //     return field.remove();
      //   }
      // }
    // };
  }


  function like_dislike(){
    function viewerExtension(v) {
      function updateViewer(field, annotation) {

        field.addClass('annotator-userinfo').html(function () {
          return $.map(annotation.userinfo, function () {
            return '<div><span><i class="fa fa-heart-o _tyktg"> Like</i></span><span><i class="fa fa-heart-o _rEz78mC"> Dislike</i></span></div>';
          }).join(' ');
        });
      }
      v.addField({
        load: updateViewer
      });
    };
  }
}

suppliedCode()
