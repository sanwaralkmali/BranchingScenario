var storyline = [];
var myarrlist = [];
var lines='';
var currentPos = '1';
var texty= '';
var secondChild ;
var firstChild ;
var root;

$('#myFile').on('change', function(){
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function(e) {
      texty = e.target.result;
      startGame(texty);
    });
    reader.readAsBinaryString(myFile);
  }
});

const Nodes = function(pos, option, message) {
  this.pos = pos;
  this.option = option;
  this.message = message;
};

function startGame(texty) {
  lines = texty.split('\n');
  for (var i = 0; i < lines.length; i++) {
    storyline = lines[i].split('|');
    myarrlist.push(new Nodes(storyline[0].split(' ')[0], storyline[1], storyline[2]));
  }
  getQuetion(currentPos);
}

function getQuetion(pos) {
  try {
    root = myarrlist.find(o => o.pos === pos);
    firstChild = myarrlist.find(o => o.pos === root.pos + '-1');
    secondChild = myarrlist.find(o => o.pos === root.pos + '-2');

   if (firstChild === undefined || secondChild === undefined ){
     $('#quetion').html(root.message);
     $('#choice1').hide();
     $('#choice2').hide();
     $('#answer1').hide();
     $('#answer2').hide();
     $('#startAgain').show();

   }
   else {
     $('#storiesChosser').hide();
     $('#startAgain').hide();
     $('#Questions').show();
     $('#quetion').html(root.message);
     $('#answer1').html(firstChild.option);
     $('#answer2').html(secondChild.option);
   }

  } catch (e) {
    $('#wrongMessage').show();
  }
}

$('#choice1').click(function() {
  currentPos = currentPos + '-1';
  getQuetion(currentPos);
});

$('#choice2').click(function() {
  currentPos = currentPos + '-2';
  getQuetion(currentPos);
});

$('#startAgain').click(function() {
  $('#storiesChosser').show();
  $('#Questions').hide();
  $('#wrongMessage').hide();

  currentPos = '1';
  storyline = [];
  myarrlist = [];
  lines='';
  root = myarrlist.find(o => o.pos === currentPos);
  firstChild = myarrlist.find(o => o.pos === root.pos + '-1');
  secondChild = myarrlist.find(o => o.pos === root.pos + '-2');
  $('#choice1').show();
  $('#choice2').show();
  $('#answer1').show();
  $('#answer2').show();
});
