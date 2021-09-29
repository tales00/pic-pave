<template lang="pug">
.control(
  :class="{isOnDrag}"
  :style="{'--size': size }"
)
  .optionPanel
    | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  .resizer(
    @mousedown="onMouseDown"
    @touchstart="onTouchstart"
  )
    .dragIndicater
      //- i.las.la-sort
      i.las.la-grip-lines
</template>

<script>
export default {
  name: 'control',
  data() {
    return {
      size: '40%',
      sizeX: '40%',
      sizeY: '40%',
      // resizerWide: '0.5rem',
      isOnDrag: false,
      isLandscape: window.matchMedia('(orientation: landscape)'),
      isTouchEnabled:
        'touchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0,
      resizer: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        sizeX: 0,
        sizeY: 0,
      },
    };
  },
  computed: {},
  methods: {
    // drag handler
    dragStartHandler({ clientX, clientY, controlEl }) {
      this.resizer.x = clientX;
      this.resizer.y = clientY;
      this.resizer.sizeX = this.sizeX;
      this.resizer.sizeY = this.sizeY;

      const { width, height } = window.getComputedStyle(controlEl);
      this.resizer.w = parseInt(width, 10);
      this.resizer.h = parseInt(height, 10);
    },
    dragMoveHandler({ clientX, clientY }) {
      const moveDistence = this.isLandscape.matches
        ? clientX - this.resizer.x
        : clientY - this.resizer.y;

      if (this.isLandscape.matches) {
        this.sizeX = `${this.resizer.w - moveDistence}px`;
        this.size = this.sizeX;
      } else {
        this.sizeY = `${this.resizer.h - moveDistence}px`;
        this.size = this.sizeY;
      }
    },

    // use mouse
    onMouseDown(ev) {
      this.dragStartHandler({
        clientX: ev.clientX,
        clientY: ev.clientY,
        controlEl: ev.target.parentElement,
      });

      document.addEventListener('mousemove', this.mouseMoveHandler);
      document.addEventListener('mouseup', this.mouseUpHandler);

      this.isOnDrag = true;
    },
    mouseMoveHandler(ev) {
      this.dragMoveHandler({
        clientX: ev.clientX,
        clientY: ev.clientY,
      });
    },
    mouseUpHandler() {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
      this.isOnDrag = false;
    },

    // use touch
    onTouchstart(ev) {
      this.dragStartHandler({
        clientX: ev.targetTouches[0].clientX,
        clientY: ev.targetTouches[0].clientY,
        controlEl: ev.target.parentElement,
      });

      document.addEventListener('touchmove', this.touchMoveHandler);
      document.addEventListener('touchend', this.touchEndHandler);
      this.isOnDrag = true;
    },
    touchMoveHandler(ev) {
      this.dragMoveHandler({
        clientX: ev.targetTouches[0].clientX,
        clientY: ev.targetTouches[0].clientY,
      });
    },
    touchEndHandler() {
      document.removeEventListener('touchmove', this.touchMoveHandler);
      document.removeEventListener('touchend', this.touchEndHandler);
      this.isOnDrag = false;
    },
  },
  mounted() {
    // this.resizerWide = this.isTouchEnabled ? '1.2rem' : '0.5rem';
    this.size = this.isLandscape.matches ? this.sizeX : this.sizeY;
    this.isLandscape.onchange = (ev) => {
      this.size = ev.matches ? this.sizeX : this.sizeY;
    };
  },
  // setup() {},
};
</script>

<style lang="scss" scoped>
.control {
  // --resizerWide: 1.6rem;
  // --text-color: var(--text-main);
  --text-color: inherit;
  // --bg-color: var(--background-body);
  --ctrl-bg-color: darkslategrey;
  --minHeight: 16rem;
  --maxHeight: 24rem;
  --minWidth: 16rem;
  --maxWidth: 32rem;
  --pd: 0.8rem;

  display: flex;
  color: var(--text-color);
  align-content: stretch;
}

.optionPanel {
  padding: var(--pd);
  height: 100%;
  overflow-x: auto;
  background-color: var(--ctrl-bg-color);
}
.resizer {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ctrl-bg-color);
  .dragIndicater {
    pointer-events: none;
  }

  // .las {
  //   font-size: 0.5rem;
  // }
}

.control.isOnDrag {
  pointer-events: none;
  user-select: none;

  .resizer {
    filter: brightness(1.25);
  }
}

@media (orientation: Landscape) {
  .control {
    min-width: var(--minWidth);
    width: var(--size);
    max-width: var(--maxWidth);
    flex-flow: row-reverse;
  }
  // .optionPanel {
  //   min-width: var(--minWidth);
  // }
  .resizer {
    border-radius: 0.4rem 0 0 0.4rem;
    box-shadow: -0.3rem 0 0.2rem rgba(0, 0, 0, 0.45);
    cursor: col-resize;
    height: 100%;
    .la-grip-lines {
      transform: rotate(90deg);
    }
  }
}

@media (orientation: Portrait) {
  .control {
    min-height: var(--minHeight);
    height: var(--size);
    max-height: var(--maxHeight);
    flex-flow: column-reverse;
  }
  // .optionPanel {
  //   min-height: var(--minHeight);
  // }
  .resizer {
    border-radius: 0.4rem 0.4rem 0 0;
    box-shadow: 0 -0.3rem 0.2rem rgba(0, 0, 0, 0.45);
    cursor: row-resize;
    width: 100%;
  }
}
</style>
