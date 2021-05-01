let project_folder = require('path').basename(__dirname);
let source_folder = '#src';

let path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/',
		libs: project_folder + '/libs/',
	},
	src: {
		html: [source_folder + '/*.html', '!'+source_folder + '/_*.html'],
		css: source_folder + '/scss/style.scss',
		js: source_folder + '/js/script.js',
		img: source_folder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/*.{ttf,woff,woff2,eot,svg}',
		libs: source_folder + '/libs/**/*',
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
		libs: source_folder + '/libs/**/*',
	},
	clean: './' + project_folder + '/'
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	group_media = require('gulp-group-css-media-queries'),
	clean_css = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default;

function doBrowserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		host: 'localhost', 
		// port: 3000,
		open: true, 
		notify: false,
		online: true
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions', 'ie 8', 'ie 7'],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: '.min.css'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: '.min.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

function fonts() {
	return src(path.src.fonts)		
		.pipe(dest(path.build.fonts));
}

function libs() {
	return src(path.src.libs)
		.pipe(dest(path.build.libs));
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.libs], libs);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, libs));
let watch = gulp.parallel(build, watchFiles, doBrowserSync);

exports.libs = libs;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;