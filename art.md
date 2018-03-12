---
layout: default
title: Art
---

{% for art in site.art %}


<h2><a href="{{ art.url | prepend: site.baseurl }}">
        {{ art.title }}
        </a>
</h2>

<p>Some other text goes here</p>

{% endfor %}  