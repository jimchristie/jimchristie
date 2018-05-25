---
layout: post
title: New Site! (again)
snippet: >-
  I've [once again](/blog/new-site/), rebuilt my website. I'm really excited
  about this rebuild. This time around, I'm using
  [Jekyll](https://jekyllrb.com/docs/home/), a static site generator.  This
  gives me a few advantages over my old Craft site.


  On top of using Jekyll, I've implemented a number of other improvements and
  new features.
category: Life
featured: true
enabled: true
featuredImage:
  fill: contain
  focalPoint:
    leftRight: center
    topBottom: center
  image: /img/uploads/jekyll-gray-background.jpg
  orientation: landscape
  altText: Jekyll logo
date: '2018-05-04 01:09:00'
---
I've [once again](/blog/new-site/), rebuilt my website. I'm really excited about this rebuild. This time around, I'm using [Jekyll](https://jekyllrb.com/docs/home/), a static site generator.  This gives me a few advantages over my old Craft site.

1. I can host it through [GitHub Pages](https://pages.github.com/), which means I don't have to maintain a server. Server maintenance takes time and money. Github Pages is a win/win.
2. It makes the site blazing fast. There's no PHP, which means server response times are ridiculously low.
3. The content is part of the Git history. It's just held in markdown files in the same repository as the site templates. I don't have to worry about keeping a database in sync with two different versions of the site when I'm building a new feature. I just develop one one branch, update content on the mainline, and merge when I'm ready. This was actually one of the biggest challenges with my old site. I often had to choose between a new feature and a new blog post. Either that, or I'd have to do some weird and risky database juggling. Not anymore!
4. The combo of Jekyll and Github pages gives me [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) out of the box. No more worrying about publishing changes. I just push to master and I'm done.  

On top of the advantages of using Jekyll, I've implemented a number of other improvements. 

One of the biggest is that I'm [lazy loading](https://en.wikipedia.org/wiki/Lazy_loading) images now, which further helps the site to load quickly. I still have some opportunities to improve how the lazy loading works, but I have a really solid start in place.

Jekyll doesn't have a [CMS ](https://en.wikipedia.org/wiki/Content_management_system)out of the box. It just uses markdown files which are then compiled into HTML files based on the templates that I built. On the one hand, this is really nice. As I mentioned above, it makes it so the content changes are part of the git history. It also means that I can work completely offline, or even completely disconnected from my site. I can write a markdown file anywhere and add it to my site later. 

However, it's really nice to have a CMS sometimes. I've added the [Netlify CMS](https://www.netlifycms.org/) to my Jekyll installation. It's an ok CMS, functional, but not fancy. It's totally customizable and the [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor is reasonably good. It compiles the text down to markdown files that I can merge into my mainline whenever I'm ready.  I have it sitting on a separate branch, hosted on [Netlify's free hosting](https://www.netlify.com/) service. It gives me a place to preview the posts before I publish them out to the rest of the world, a playground of sorts.

You might have also noticed that I've completely reworked the design of the site. This less flashy, more utilitarian version is, I think, much more "me." 

I have some other new features in mind. The biggest is a book review section. I've always loved reading and I would love to share my thoughts about the books I read, both for [work](/work) and for fun.  I'm also planning to add RSS feeds, some filtering for the blog posts, and probably some more things that I can't think of right off the top of my head. 

I think this new structure will give me more time  and flexibility to develop those features, as well as keep up on blogging a little better. Come back and check it all out!
