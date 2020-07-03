///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'esri/Camera'
],
function(declare, BaseWidget,Camera) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget,Camera], {
    //Please note that the widget depends on the 4.0 API
    baseClass: 'jimu-widget-listviews',

    var slides = [],
    
    _getViewCoordinate : function(slidesArray){
        var cam = new Camera({
            heading : this.view.camera.get('heading'),
            tilt : this.view.camera.get('tilt'),
            position : this.view.camera.get('position')
        }); // création d'un objet caméra (lorsqu'on cliquera sur le bouton)
        slidesArray.push(cam); // ajout de cet objet à la liste des vues
    },

    _removeSlide : function(){
    },

    _goToSlide : function(){
      selectedView = document.getElementById('');//est ce qu'il faut définir un id différent pour chaque ou c'est faisable tel quel (liste d'objet dont l'id est l'index) ?
      this.view.camera.goTo(selectedView);
    },

    _displaySlides : function(slidesArray){
      var slideContainer, slide
      if (slidesArray.length>0){ // On vérifie qu'il y a au moins une view dans la liste pour afficher la barre des views
        slideContainer = document.createElement('DIV'); // création de la barre qui contiendra les views clickables
        slideContainer.className = 'slide-container';
        slidesArray.forEach((item, i) => {
          slide = document.createElement('div');
          slide.className = 'slide-miniature';
          slide.id = i;
          slide.content = item; // vérifier ça
          slideContainer.appendChild(slide);


        }); // On parcourt la liste pour ajouter
      } else {
        console.log('NO VIEW SET');
      }
    },

    postCreate: function() {
      this.inherited(arguments);
      document
            .getElementById('addView') // addView est l'ID du bouton sur Widget.html
            .addEventListener("click",_getViewCoordinate(slides)); // lorsqu'on clique sur le bouton addView, on lance la fonction _getViewCoordinate
      this._displaySlides(slides);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      this.mapIdNode.innerHTML = 'sceneView id:' + this.sceneView.map.id;
      console.log('startup');
    },

    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    }
  });
});
