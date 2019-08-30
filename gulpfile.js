const { src, dest, task, watch, series,parallel } = require('gulp');
const browserSync = require('browser-sync').create();


function regarderVue(cb) {
    browserSync.reload();
    cb();
}

function regarderCSS(cb){
    browserSync.reload();
    cb();
}

function rafraichir(cb) {
    browserSync.init({
        proxy: 'localhost:3000'
    });
    watch('./vues/**/*.ejs', regarderVue);
    watch('./css/**/*.css', regarderCSS);
    cb();
}

exports.default = rafraichir;