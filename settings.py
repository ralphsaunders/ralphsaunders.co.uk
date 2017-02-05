# -*- coding: utf-8 -*-
from __future__ import unicode_literals

AUTHOR = 'Ralph Saunders'
SITENAME = "ralphsaunders.co.uk"
SITEURL = 'http://ralphsaunders.co.uk'
TIMEZONE = "Europe/London"

# can be useful in development, but set to False when you're ready to publish
RELATIVE_URLS = True

GITHUB_URL = 'http://github.com/ralphsaunders/'
REVERSE_CATEGORY_ORDER = True
LOCALE = "C"
DEFAULT_PAGINATION = 20
DEFAULT_DATE = (2012, 3, 2, 14, 1, 1)

FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

# static paths will be copied without parsing their contents
STATIC_PATHS = [
        'images/',
        'videos/',
        ]

# Archives
YEAR_ARCHIVE_SAVE_AS = 'posts/{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/index.html'

SOCIAL = {'twitter': 'http://twitter.com/ralphsaunders',
        'dribbble': 'http://dribbble.com/ralphsaunders',
        'github': 'http://github.com/ralphsaunders'}


# custom page generated with a jinja2 template
# TEMPLATE_PAGES = {'pages/jinja2_template.html': 'jinja2_template.html'}

# code blocks with line numbers
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}

# foobar will not be used, because it's not in caps. All configuration keys
# have to be in caps
# foobar = "barbaz"

# Ralph's Settings
THEME = 'themes/ralphsaunders.co.uk'
THEME_STATIC_PATHS = ['dist']
