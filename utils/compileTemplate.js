const Handlebars = require("handlebars");

function getTitleFontSize(title = "") {
  if (!title || typeof title !== "string") return "";

  const titleLength = title.length;

  if (titleLength > 55) return "1rem";
  if (titleLength > 35) return "1.5rem";
  if (titleLength > 25) return "2.0rem";

  return "2.0rem";
}

function compileStyles(templateStyles, { fontSize }) {
  return Handlebars.compile(templateStyles)({
    fontSize,
  });
}

function getCompiledHTML(templateName, { title, ticketNumber }) {
  const { templateHTML, templateStyles } = require(templateName);
  return Handlebars.compile(templateHTML)({
    title,
    ticketNumber,
    styles: compileStyles(templateStyles, { fontSize: getTitleFontSize(title) }),
  });
}

module.exports = { getCompiledHTML };
