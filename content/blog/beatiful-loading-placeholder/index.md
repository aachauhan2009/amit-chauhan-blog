---
title: Beautiful CSS placeholder loading animation 
date: "2020-02-08"
description: "Beautiful loading placeholder animation using css"
---

Do you want to create animated placeholder instead of creating full page loader? This post is for you!

We will create placeholder animation with css and it's really easy.

This placeholder animation works with most of elements.

First we need to create css keyframe animation.

```css
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1000px 0;
  }
}
```

I will explain what is happening here later.

Now let's create loading class.

```css
.loading {
  width: 100px;
  height: 100px;
  background-image: linear-gradient(
    90deg,
    #e4e4e4 0%,
    #f1f1f1 40%,
    #ededed 60%,
    #e4e4e4 100%
  );
  background-position: 0px 0px;
  background-repeat: repeat;
  animation: animatedBackground 5s linear infinite;
}
```

Now let's understand what is there in loading class.

`height` and `width` are size of our placeholder.
We have gradient background to our place holder which has four shades gray colors at 0%, 40%, 60%, 100%. Important part here is first and last color should be same so that animation doesn't look broken.
we have set default position at 0px 0px and it's repeating background.

Now we will use our keyframe animation which is changing background position from `0px 0px` to `1000px 0px`

So our linear gradient background moves horizontally and we can see beautiful animated placeholder.

We can add this animation to circle element which are using border-radius.

Even you can play around use different background-gradient to make different kind of animations.

For example we can create rainbow animation like this.

```css
.rainbow {
  width: 500px;
  height: 100px;
  margin: 15px;
  background-image: linear-gradient(
    90deg,
    red 0%,
    orange 7%,
    yellow 21%,
    green 35%,
    blue 49%,
    indigo 63%,
    violet 77%,
    red 91%
  );
  background-position: 0px 0px;
  background-repeat: repeat;
  animation: animatedBackground 5s linear infinite;
}
```

So when next time you are asked to create placeholder animation don't panic it's really simple!

Here are reference of codepen and codesandbox using react js.

**Codepend:** 

https://codepen.io/aachauhan2009/pen/KKpwxWx

**Codesandbox:**

https://codesandbox.io/s/loading-placeholder-sggfz