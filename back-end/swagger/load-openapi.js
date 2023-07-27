
import openapi from './openapi.json' assert {type: 'json'};

const ui = SwaggerUIBundle({
  spec: openapi,
  dom_id: '#swagger-ui',
  presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIStandalonePreset
  ],
  layout: "StandaloneLayout"
})


// const ui = SwaggerUIBundle({
//   spec: {
//     // your OpenAPI definition here
//   },
//   dom_id: '#swagger-ui',
//   presets: [
//     SwaggerUIBundle.presets.apis,
//     SwaggerUIStandalonePreset
//   ],
//   layout: "StandaloneLayout"
// })

