import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import autoprefixer from "gulp-autoprefixer";
import browserSyncLib from "browser-sync";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css"; // Importa o gulp-clean-css

// Configuração para usar Dart Sass
const sassCompiler = gulpSass(sass); // Configura o compilador corretamente
const browserSync = browserSyncLib.create();

// Compilando o sass, adicionando autoprefixed e dando refresh na página
function compilaSass() {
	return gulp
		.src("scss/*.scss")
		.pipe(sassCompiler()) // Corrigido para usar o compilador configurado
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"],
				cascade: false,
			})
		)

		.pipe(concat("style.css"))
		.pipe(gulp.dest("../"))
		.pipe(gulp.dest("./"))

		.pipe(cleanCSS({ level: 2 }))
		.pipe(concat("style.min.css")) // Renomeia o arquivo minificado
		.pipe(gulp.dest("../")) // Salva a versão minificada
		.pipe(gulp.dest("./"))
		.pipe(browserSync.stream());
}

// Tarefa do Sass
export const sassTask = compilaSass;

function pluginsCSS() {
	return gulp.src("css/lib/*.css").pipe(concat("plugins.css")).pipe(gulp.dest("css/")).pipe(browserSync.stream());
}
export const plugincss = pluginsCSS;

function gulpJs() {
	return gulp
		.src("js/scripts/*.js")
		.pipe(concat("all.js"))
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest("js/"))
		.pipe(gulp.dest("../js/"))
		.pipe(browserSync.stream());
}
export const alljs = gulpJs;

function pluginsJs() {
	return gulp.src("js/lib/*.js").pipe(concat("plugins.js")).pipe(gulp.dest("js/")).pipe(browserSync.stream());
}
export const pluginjs = pluginsJs;

// Função do BrowserSync
function browser() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
}
export const browserSyncTask = browser;

// Função do watch para alterações em SCSS e HTML
function watchFiles() {
	gulp.watch("scss/*.scss", compilaSass);
	gulp.watch("css/lib/*.css", pluginsCSS);
	gulp.watch("*.html").on("change", browserSync.reload);
	gulp.watch("js/scripts/*.js", gulpJs);
	gulp.watch("js/lib/*.js", pluginsJs);
}
export const watch = watchFiles;

// Tarefas default que executam o watch e o BrowserSync
export default gulp.parallel(watchFiles, browser, compilaSass, pluginsCSS, gulpJs, pluginsJs);
