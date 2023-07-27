import React from "react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export const Swagger = () => (
  <SwaggerUI url="http://159.89.47.38:5051/openapi.json" />
)

// export default SwaggerUI
