export const isHtmlRenderRequest = (accept: string | undefined) =>
  !accept || accept === "*/*" || accept.match(/(text|html)/);
