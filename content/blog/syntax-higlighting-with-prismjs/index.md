---
title: Syntax Highlighting with Prismjs and React 
date: "2020-01-23"
description: "Syntax Highlighting with Prismjs and React"
---

In this blog post, I will explain a really easy way to add syntax highlighting in your page where you want to show code the same https://reactjs.org or any site which shows code with syntax highlighting.

We will use https://prismjs.com/ library for highlighting syntax.

Let's start by creating our react component to show code.


```javascript
import React, { useEffect } from "react";

export default function Code({ code, language }) {
  return (
    <div className="Code">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

```

This component will display your code but without any syntax highlighting.

Now let's add prismjs using npm or yarn.

`npm install --save prismjs`

or

`yarn add prismjs`

Now we can use this in our component


```javascript
import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "./styles.css";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
```

Now just pass any code and language to this component and boom we have added syntax highlighting in any react app!!

There are also different themes available in prismjs which can be used by just importing different CSS file.

In this example I have used tomorrow-night theme, you can use any theme.

Codesandbox demo: https://codesandbox.io/s/syntax-highlighting-with-prismjs-36ud2
