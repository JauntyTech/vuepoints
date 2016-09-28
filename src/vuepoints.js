Vue.component('lines-vuepoint', {
  props: ['lines'],
  computed: {
    linesWithSegments: function() {
      var linesWithSegments = []
      for (lineIndex = 0; lineIndex < this.lines.length; lineIndex++) {
        var line = this.lines[lineIndex]
        var lineId = ''
        var lineSegments = []
        var lastPoint = null
        for (pointIndex = 0; pointIndex < line.length; pointIndex++) {
          var point = line[pointIndex]
          lineId += point.x.toString() + point.y.toString()
          if (lastPoint) {
            lineSegments.push([ lastPoint, point ])
          }
          lastPoint = point
        }
        var lineWithSegments = {
          id: lineId,
          segments: lineSegments
        }
        linesWithSegments.push(lineWithSegments)
      }
      return linesWithSegments
    }
  },
  template: '\
    <svg style="height: 500; width: 500;">\
      <transition-group name="lines" tag="g">\
        <g v-for="line in linesWithSegments" :key="line.id">\
          <line v-for="segment in line.segments"\
            :x1="100 * segment[0].x" :y1="100 * segment[0].y"\
            :x2="100 * segment[1].x" :y2="100 * segment[1].y"\
            stroke-width="2" stroke="black"/>\
        </g>\
      </transition-group>\
    </div>\
  '
})

Vue.component('points-vuepoint', {
  props: ['points'],
  template: '\
    <svg style="height: 500; width: 500;">\
      <transition-group name="points" tag="g">\
        <circle v-for="point in points" :key="point.id"\
          :cx="100 + 300 * point.x" :cy="100 + 300 * point.y" r="10"\
          stroke="black"/>\
      </transition-group>\
    </div>\
  '
})

function VuepointManager(wrapperId, state, reactions) {
  new Vue({
    el: '#' + wrapperId,
    data: {
      state: state
    }
  })
  return {
    react: function(action) {
      var reaction = reactions[action]
      reaction(state)
    }
  }
}
