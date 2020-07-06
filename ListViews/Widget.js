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
var slides = [];

define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'esri/Camera'
],

function(declare, BaseWidget,Camera) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API
    baseClass: 'jimu-widget-listviews',

    _getViewCoordinate : function(self, slidesArray){
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
      slides.forEach((item, i) => {
        selectedView = document.getElementById(i.toString());
      });//est ce qu'il faut définir un id différent pour chaque ou c'est faisable tel quel (liste d'objet dont l'id est l'index) ?
      this.view.camera.goTo(selectedView);
    },

    _displaySlides : function(slidesArray){
      var slideContainer, slide;
      if (slidesArray.length>0){ // On vérifie qu'il y a au moins une view dans la liste pour afficher la barre des views
        slideContainer = document.createElement('DIV'); // création de la barre qui contiendra les views clickables
        slideContainer.className = 'slide-container';
        slidesArray.forEach((item, i) => {
          slide = document.createElement('div');
          slide.className = 'slide-miniature';
          slide.id = i.toString();
          slide.content = item; // vérifier ça
          slideContainer.appendChild(slide);


        }); // On parcourt la liste pour ajouter
      } else {
        console.log('NO VIEW SET');
      }
    },
    test : function(){
      console.log('Event worked');
    },

    postCreate: function() {
      this.inherited(arguments);
      //document
            //.getElementById('addView')
            //.onclick(test()); // addView est l'ID du bouton sur Widget.html
            //.addEventListener("click", test());
      //      .addEventListener("click",_getViewCoordinate(slides)); // lorsqu'on clique sur le bouton addView, on lance la fonction _getViewCoordinate
      //this._displaySlides(slides);
      console.log('postCreate');

    },

    startup: function() {
      this.inherited(arguments);
      //this.mapIdNode.innerHTML = 'sceneView id:' + this.sceneView.map.id;
      this.mapIdNode.innerHTML = '<button id="addView" class = "esri-button">Add View</button><br><br><button id="gotoview" class = "esri-button">Go to View</button>';
      document
            .getElementById('addView').addEventListener("click",  () => {slides.push(this.sceneView.camera);
            console.log(slides)});
      var i =0;
      document
            .getElementById('gotoview').addEventListener("click",  () =>{
              this.sceneView.goTo(slides[i])
              if (i < slides.length-1){
                i++;}
              else{i=0}});


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
