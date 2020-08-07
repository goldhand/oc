// url("https://m.media-amazon.com/images/G/01/katal/AmazonEmberLight._CB497338012_.woff")
// https://m.media-amazon.com/images/G/01/katal/AmazonEmberBold._CB459953743_.woff2
// https://m.media-amazon.com/images/G/01/katal/katal-flo-icon-font._CB451345079_.woff2
module.exports = `
@font-face {
  font-family: "Amazon Ember";
  src: url("https://m.media-amazon.com/images/G/01/katal/AmazonEmberRg._CB497338012_.woff2");
}
body {
  width: 1024px;
  margin: 0 auto;
  font-family: Amazon Ember,Arial,sans-serif,Helvetica Neue", Calibri, Helvetica;
}
h1, h2, h3 {
  color: darkred;
  float: left;
  width: 100%;
}
.logo {
  display: block;
}
.logo > img {
  max-height: 10rem;
}

h1 {
  margin-top: 0;
  color: #002F36;
  border-bottom: 1px solid #002F36;
}

a {
  color: #002F36;
}

p {
  float: left;
  margin-top: 0;
}

.back {
  float: left;
  width: 100%;
  margin-top: -20px;
}

.code,
.preview {
  float: left;
  width: 100%;
}

.preview {
  height: 300px;
  border: 1px solid #002F36;
}

.table {
  width: 100%;
  float: left;
}

.w-100 {
  width: 100%;
}

.row {
  background-color: #EBEEEF;
  border: 1px solid #002F36;
  width: 100%;
  display: flex;
  padding: 10px 0px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 4px;
}

.row.header {
  background-color: #D5DBDB;
  border: 1px solid #002F36 !important;
}

.row.header div {
  font-weight: bold;
  margin: 0;
  align-self: flex-start;
}

.row.double {
  min-height: 60px;
}

.row div {
  word-wrap: break-word;
}

.row span {
  padding-right: 10px;
}

.componentRow:hover {
  background-color: #D5DBDB;
}

.componentRow .title .name {
  font-weight: bold;
  font-size: 18px;
  margin: 0;
  width: 100%;
}

.componentRow .release {
  font-size: 16px;
  margin: 0;
  width: 100%;
}

.componentRow .title .description {
  padding: 0;
  font-size: 14px;
}

.social {
  float: left;
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.field {
  width: 100%;
  float: left;
}

.field p,
.field span,
.field a {
  float: left;
  margin: 0;
}

.field p {
  color: #008296;
  font-weight: bold;
  margin-right: 10px;
}

input[type=text],
textarea {
  height: 43px;
  font-family: Arial;
  border: 1px solid #008296;
  margin-bottom: 10px;
  font-size: 20px;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.filters {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.row > * {
  flex: 0 1 8%;
  padding: 0px 5px;
  align-self: center;
}

.row > *:last-child {
  padding-right: 10px;
}

.row > *:first-child {
  padding-left: 10px;
}

.release,
.title,
.filters > * {
  flex: 1 0;
}

.title {
  display: flex;
  flex-direction: column;
}

.author-filter {
  flex: 0 1 30%;
  margin-left: 15px;
}

.parameter {
  flex: 1 0;
  max-width: 25%;
  align-self: flex-start;
}

.parameter-description {
  flex: 1 0;
  max-width: 70%;
}

.author {
  flex: 0 1 15%;
  word-break: break-all;
}

#href {
  height: 60px;
}

.states {
  width: 100%;
  margin-bottom: 30px;
}

.states span,
.states .state {
  float: left;
  margin-right: 20px;
}

.states input {
  float: left;
}

.details-state span {
  padding: 1px 5px;
  margin-left: 10px;
  font-size: 75%;
  font-weight: bold;
  color: #FFF;
  background-color: #1E42B9;
  white-space: nowrap;
}

.state {
  margin-right: 10px;
  font-size: 75%;
  font-weight: bold;
  color: #FFF;
  white-space: nowrap;
}

.table .state {
  background-color: #1E42B9;
  height: 17px;
  padding: 1px 5px;
}

.component-state-experimental,
.details-state .component-state-experimental,
.table .component-state-experimental {
  background-color: #FFC400;
  height: 17px;
  padding: 1px 5px;
}

.component-state-deprecated,
.details-state .component-state-deprecated,
.table .component-state-deprecated {
  background-color: #CC0C39;
  height: 17px;
  padding: 1px 5px;
}

a.tab-link {
  color: #008296;
  text-decoration: none;
}

a.tab-link.selected {
  background-color: #E3ECED;
}

.bold {
  font-weight: bold;
}

.hide {
  display: none !important;
}
`;
