'use strict';

$(function() {

  var COLOR_FAIL_RESULT = '#e00';
  var MESSAGE_FAIL_RESULT = 'К сожалению не все ответы были верными. Попробуйте повторно пройти тест!';

  var COLOR_SUCCESS_RESULT = '#0e0';
  var MESSAGE_SUCCESS_RESULT = 'Вы ответили правильно на все вопросы! Поздравляем!';

  function loadTest() {
    var questions = [ {
      text: 'Вопрос 1',
      answers: [
        { 
          number: 1,
          text: 'Вариант ответа №1',
          isProperly: true
        },
        { 
          number: 2,
          text: 'Вариант ответа №2',
          isProperly: false
        },
        { 
          number: 3,
          text: 'Вариант ответа №3',
          isProperly: false
        }
      ]
    }, 
    
    {
      text: 'Вопрос 2',
      answers: [
        { 
          number: 1,
          text: 'Вариант ответа №1',
          isProperly: true
        },
        { 
          number: 2,
          text: 'Вариант ответа №2',
          isProperly: false
        },
        { 
          number: 3,
          text: 'Вариант ответа №3',
          isProperly: true
        }
      ]
    },

    {
      text: 'Вопрос 3',
      answers: [
        { 
          number: 1,
          text: 'Вариант ответа №1',
          isProperly: false
        },
        { 
          number: 2,
          text: 'Вариант ответа №2',
          isProperly: true
        },
        { 
          number: 3,
          text: 'Вариант ответа №3',
          isProperly: true
        }
      ]
    } ];

    localStorage.clear();
  
    for (var i = 0; i < questions.length; i++) {
      localStorage.setItem('question' + ( '00' + (i + 1) ).slice(-3), JSON.stringify(questions[i]));
    }
  };

  function showResult(message, color) {
    $('body').append('<div class="modal-dialog"><div class="dialog-info">'+message+'<div class="dialog-button">ОК</div></div></div>');
    $('.modal-dialog').css( {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      position: "fixed",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0 } );

    $('.dialog-info').css( {
      backgroundColor: "rgba(255, 255, 255, 1)",
      position: "absolute",
      marginTop: "-60px",
      height: "120px",
      width: "30%",
      top: "50%",
      left: "35%",
      textAlign: "center",
      verticalAlign: "middle",
      boxSizing: "border-box",
      border: "5px solid " + color,
      fontFamily: "Arial, sans-serif",
      fontSize: "18px",
      borderRadius: "10px",
      padding: "10px" } );

    $('.dialog-button').css( {
      backgroundColor: color,
      textAlign: "center",
      verticalAlign: "middle",
      boxSizing: "border-box",
      border: "1px solid #000",
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      padding: "10px" ,
      margin: "10px auto",
      fontWeight: "bold",
      width: "30%",
      cursor: "pointer",
      borderRadius: "5px"
    } ).one('click', function() {
      $('.answer-item input[type="checkbox"]').prop('checked', false);
      $('.modal-dialog').remove();
    });
  }

  function showTest() {
    var questions = [];
    var questionNumber = 1;
    var question = localStorage.getItem('question' + ('00' + questionNumber).slice(-3));

    while (question) {
      questions.push(JSON.parse(question));
      question = localStorage.getItem('question' + ('00' + ++questionNumber).slice(-3));
    }

    var tmpl = _.template($('#tmpl-test')[0].innerHTML)    
    var result = tmpl({questions: questions})
    
    $('.wrapper').append(result);

    $('.test-button').on('click', function(e) {
      e.preventDefault();
      
      var properlyAnswers = [];
      for (var i = 0; i < questions.length; i++) {
        var answers = [];
        for (var j = 0; j < questions[i].answers.length; j++) {
          answers.push(questions[i].answers[j].isProperly);
        }
        properlyAnswers.push(answers);
      }

      var checkboxes = $('.answer-item');

      var userAnswers = [];
      for (var i = 0; i < questions.length; i++) {
        var answers = [];
        for (var j = 0; j < questions[i].answers.length; j++) {
          answers.push(checkboxes.find('#q' + i + '_' + j).is(':checked'));
        }
        userAnswers.push(answers);
      }

      if (userAnswers.join() === properlyAnswers.join()) {
        showResult(MESSAGE_SUCCESS_RESULT, COLOR_SUCCESS_RESULT);
      } else {
        showResult(MESSAGE_FAIL_RESULT, COLOR_FAIL_RESULT);
      }

    });
  };

  loadTest();
  showTest();
});

