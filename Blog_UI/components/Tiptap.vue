<template>
  <div>
    <el-tiptap
      :content="pContent"
      :extensions="extensions"
      placeholder="Nhập bài viết..."
      :char-counter-count="true"
      height="100%"
      @onUpdate="onUpdate"
    >
    </el-tiptap>
  </div>
</template>

<script>
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  Link,
  CodeBlock,
  Blockquote,
  TextColor,
  FontSize,
  FontType,
  TextAlign,
  Fullscreen,
  Preview,
  LineHeight,
  FormatClear,
} from 'element-tiptap'

export default {
  model: {
    prop: 'pContent',
    event: 'onChange',
  },
  props: {
    pContent: {
      type: String,
      required: true,
    },
  },
  data() {
    // editor extensions
    // they will be added to menubar and bubble menu by the order you declare.
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
          urlPattern: '',
          //   uploadRequest:
        }),
        new Link(),
        new CodeBlock(),
        new Blockquote(),
        new TextColor({
          colors: ['#007cc2'],
        }),
        new FontType(),
        new FontSize(),
        new TextAlign(),
        new Fullscreen(),
        new Preview(),
        new LineHeight({
          lineHeights: ['100%', '200%', '300%'],
        }),
        new FormatClear(),
      ],
    }
  },
  methods: {
    onUpdate(value) {
      this.$emit('onChange', value)
    },
  },
}
</script>
