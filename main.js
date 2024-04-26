var Typer = {
  text: '',
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: '',
  init: function () {
    this.accessCountimer = setInterval(this.updLstChr.bind(this), 500)
    $.get(
      this.file,
      function (data) {
        this.text = data
      }.bind(this)
    )
  },

  content: function () {
    return $('#console').html()
  },

  write: function (str) {
    $('#console').append(str)
    return false
  },

  addText: function () {
    if (this.text) {
      var cont = this.content()
      if (cont.endsWith('|')) {
        $('#console').html(cont.slice(0, -1))
      }
      this.index += this.speed
      var text = this.text.substring(0, this.index)
      $('#console').html(text.replace(/\n/g, '<br/>'))
      window.scrollBy(0, 50)
    }
  },

  updLstChr: function () {
    var cont = this.content()
    if (cont.endsWith('|')) {
      $('#console').html(cont.slice(0, -1))
    } else {
      this.write('|')
    }
  }
}

Typer.speed = 3
Typer.file = 'info.txt'
Typer.init()

var timer = setInterval(function () {
  Typer.addText()

  if (Typer.index > Typer.text.length) {
    clearInterval(timer)
  }
}, 30)
