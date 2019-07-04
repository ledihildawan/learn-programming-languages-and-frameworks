Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

const hashtags =
  "#ui #dribbble #ux #design #webdesign #graphic #uidesign #userinterface #minimal #graphicdesignui #inspiration #interface #appdesign #digital #graphicdesignuiweb #app #graphicdesign #creative #webdesigner #userexperience #uxdesign #designinspiration #dribbblers #uxigers #dailyinspiration #uitrends #uitrends #welovewedesign #uipatterns #theuiuxcollective";

const hashtagsArr = hashtags.split(" ");

const hashtagsUnique = hashtagsArr.unique();

console.log(hashtagsUnique);
