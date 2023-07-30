import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})