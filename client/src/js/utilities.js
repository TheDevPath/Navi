import {h, Component} from "preact";
import {makeRequest} from "./server-requests-utils";

function createButton(label, cssClass, container,id) {
  var btn = L.DomUtil.create('button', cssClass, container);
  btn.setAttribute('type', 'button');
  btn.setAttribute('id',id);
  btn.innerHTML = label;
  return btn;
}


function createLabel(label, cssClass, container) {
  var displayLabel = L.DomUtil.create('div',cssClass, container);
  displayLabel.innerHTML = label;
  return displayLabel;
}

function createInput(input, cssClass, container) {
  var input = L.DomUtil.create('input', cssClass, container);
  input.setAttribute('type', 'input');
  input.setAttribute('placeholder', 'Enter Description');
  return input;
}

//Export Statements
export {createLabel, createButton, createInput};
