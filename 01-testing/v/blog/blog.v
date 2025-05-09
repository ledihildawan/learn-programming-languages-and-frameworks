module main

import db.sqlite
import vweb

struct App {
	vweb.Context
pub mut:
	db sqlite.DB
}

fn main() {
	mut app := App{
		db: sqlite.connect(':memory:')!
	}
	sql app.db {
		create table Article
	}!

	first_article := Article{
		title: 'Hello, world!'
		text: 'V is great.'
	}

	second_article := Article{
		title: 'Second post.'
		text: 'Hm... what should I write about?'
	}

	sql app.db {
		insert first_article into Article
		insert second_article into Article
	}!

	vweb.run(app, 8081)
}

['/index']
pub fn (mut app App) index() vweb.Result {
	message := 'Hello, world from Vweb!'
	articles := app.find_all_articles()
	return $vweb.html()
}