import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import autoprefixer from "gulp-autoprefixer";
import browserSyncLib from "browser-sync";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";

const sassCompiler = gulpSass(sass);
const browserSync = browserSyncLib.create();

function compilaSass() {
	return gulp
		.src("src/scss/**/*.scss")
		.pipe(
			sassCompiler({
				includePaths: ["node_modules"],
			}).on("error", sassCompiler.logError)
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"],
				cascade: false,
			})
		)

		.pipe(cleanCSS({ level: 2 }))
		.pipe(concat("style.min.css"))
		.pipe(gulp.dest("src/css/"))
		.pipe(gulp.dest("dist/css/"))
		.pipe(browserSync.stream());
}

// Tarefa do Sass
export const sassTask = compilaSass;

function pluginsCSS() {
	return gulp.src("src/css/lib/*.css").pipe(concat("plugins.css")).pipe(gulp.dest("dist/css/")).pipe(gulp.dest("src/css/")).pipe(browserSync.stream());
}
export const plugincss = pluginsCSS;

function gulpJs() {
	return gulp
		.src("src/js/scripts/*.js")
		.pipe(concat("all.js"))
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest("src/js/"))
		.pipe(gulp.dest("dist/js/"))
		.pipe(browserSync.stream());
}
export const alljs = gulpJs;

function pluginsJs() {
	return gulp.src("src/js/lib/*.js").pipe(concat("plugins.js")).pipe(gulp.dest("dist/js/")).pipe(gulp.dest("src/js/")).pipe(browserSync.stream());
}
export const pluginjs = pluginsJs;

// Função do BrowserSync
function browser() {
	browserSync.init({
		server: {
			baseDir: "./src/",
		},
	});
}
export const browserSyncTask = browser;

// Função do watch para alterações em SCSS e HTML
function watchFiles() {
	gulp.watch("src/scss/**/*.scss", compilaSass);
	gulp.watch("src/css/lib/*.css", pluginsCSS);
	gulp.watch("src/*.html").on("change", browserSync.reload);
	gulp.watch("src/js/scripts/*.js", gulpJs);
	gulp.watch("src/js/lib/*.js", pluginsJs);
}
export const watch = watchFiles;

// Tarefas default que executam o watch e o BrowserSync
export default gulp.parallel(watchFiles, browser, compilaSass, pluginsCSS, gulpJs, pluginsJs);
