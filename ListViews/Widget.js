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
var thmbnails =[];
define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'esri/Camera',
    'esri/Viewpoint',
    'esri/webscene/Slide'
],

function(declare, BaseWidget,Camera, Viewpoint,Slide) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API
    baseClass: 'jimu-widget-listviews',

    /*_getViewCoordinate : function(self, slidesArray){
        var cam = new Camera({
            heading : this.view.camera.get('heading'),
            tilt : this.view.camera.get('tilt'),
            position : this.view.camera.get('position')
        }); // création d'un objet caméra (lorsqu'on cliquera sur le bouton)
        slidesArray.push(cam); // ajout de cet objet à la liste des vues
    },

    //slides : this.sceneView.map.presentation.slides.length === 0 ? [] : this.sceneView.presentation.slides.length,

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
    /*_displaySlides2 : function(slidesArray){
      var option = {
        width:380,
        height:120
      };

      var str = '<li class="slide">' +
              '<div class="slide-div">' +
    },*/

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
      slides = this.sceneView.map.presentation.slides.length === 0 ? [] : this.sceneView.presentation.slides.length;
      console.log('postCreate');
      console.log(slides);
    },

    startup: function() {
      this.inherited(arguments);
      //this.mapIdNode.innerHTML = 'sceneView id:' + this.sceneView.map.id;
      this.mapIdNode.innerHTML = '<button id="addView" class = "esri-button">Add View</button><br><br><button id="gotoview" class = "esri-button">Go to View</button>';
      var url;
      var urlbis;
      document
            .getElementById('addView').addEventListener("click",  () => {
              var options = {
                width:380,
                height:120
              };
              /*
              slides.push(this.sceneView.camera);
              //this.sceneView.map.presentation.slides.push(this.sceneView.camera);
              console.log(slides);
              //thmbnails.push(this.sceneView.takeScreenshot(options));
              url = this.sceneView.takeScreenshot(options).then((screenshot) => {
                urlbis = screenshot.dataUrl;
                return screenshot.dataUrl;
              });
              console.log(url);
              thmbnails.push(url);
              console.log(urlbis);
              this._displaySlides(slides)*/
              var cam = this.sceneView.camera;
              var view = new Viewpoint({
                camera : cam
              });
              var thb = this.sceneView.takeScreenshot(options).then((screenshot) => {
                urlbis = screenshot.dataUrl;
                return screenshot.dataUrl;
              });
              console.log(thb);
              var slide = new Slide ({
                viewpoint : view,
                thumbnail :{
                  url : thb}
              });
              slides.push(slide);
              console.log(slide);
              this.sceneView.atmosphere ='high'
              this.sceneView.map.presentation.slides.push(slide)
              });
      var i =0;
      document
            .getElementById('gotoview').addEventListener("click",  () =>{
              /*this.sceneView.goTo(slides[i])
              if (i < slides.length-1){
                i++;}
              else{i=0}*/
              slides[i].applyTo(this.sceneView)
              if (i < slides.length-1){
                i++;}
              else{i=0}
            });


      console.log('startup');
    },

    onOpen: function(){
      console.log('onOpen');
      console.log(this.sceneView.map.presentation.slides);

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
