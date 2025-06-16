import { Component, OnInit } from '@angular/core'; // add OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  questions = [
    {
      question: 'He ___ to the market every Sunday.',
      options: ['go', 'goes', 'went', 'gone'],
      answer: 'goes', // Present Simple
    },
    {
      question: 'They ___ dinner when I called.',
      options: ['have', 'had', 'were having', 'has'],
      answer: 'were having', // Past Continuous
    },
    {
      question: 'She ___ a letter last night.',
      options: ['writes', 'write', 'wrote', 'written'],
      answer: 'wrote', // Past Simple
    },
    {
      question: 'I ___ in this company for five years.',
      options: ['am working', 'have worked', 'worked', 'was working'],
      answer: 'have worked', // Present Perfect
    },
    {
      question: 'We ___ the match by the time you arrived.',
      options: ['start', 'have started', 'had started', 'started'],
      answer: 'had started', // Past Perfect
    },
    {
      question: 'By next year, she ___ her thesis.',
      options: [
        'will finish',
        'would finish',
        'will have finished',
        'has finished',
      ],
      answer: 'will have finished', // Future Perfect
    },
    {
      question: 'Right now, the kids ___ in the garden.',
      options: ['play', 'are playing', 'played', 'were playing'],
      answer: 'are playing', // Present Continuous
    },
    {
      question: 'If he ___ earlier, he would have caught the bus.',
      options: ['left', 'had left', 'was leaving', 'leaves'],
      answer: 'had left', // Past Perfect (conditional)
    },
    {
      question: 'She usually ___ tea in the morning.',
      options: ['drink', 'drinks', 'drank', 'drunk'],
      answer: 'drinks', // Present Simple
    },
    {
      question: 'They ___ to finish the project by tomorrow.',
      options: ['try', 'tries', 'have been trying', 'tried'],
      answer: 'have been trying', // Present Perfect Continuous
    },
    {
      question: 'He ___ when I arrived.',
      options: ['slept', 'had been sleeping', 'was slept', 'has slept'],
      answer: 'had been sleeping', // Past Perfect Continuous
    },
    {
      question: 'This time next week, I ___ in Goa.',
      options: ['am staying', 'will be staying', 'have stayed', 'stay'],
      answer: 'will be staying', // Future Continuous
    },
    {
      question: 'They ___ the new project tomorrow.',
      options: ['starts', 'start', 'will start', 'have started'],
      answer: 'will start', // Future Simple
    },
    {
      question: 'He ___ to the office lately.',
      options: [
        'has not come',
        'did not came',
        'is not coming',
        'does not come',
      ],
      answer: 'has not come', // Present Perfect (negative)
    },
    {
      question: 'I ___ a movie when the power went out.',
      options: ['was watching', 'watched', 'have watched', 'am watching'],
      answer: 'was watching', // Past Continuous
    },
  ];

  answers: string[] = [];
  submitted = false;
  score = 0;

  // Timer logic
  minutes = 15;
  seconds = 0;
  private totalSeconds = 900;
  private timerInterval: any;
  startTime: number = 0;
  timeTaken = '';

  ngOnInit(): void {
    this.startTime = Date.now();
    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.minutes = Math.floor(this.totalSeconds / 60);
        this.seconds = this.totalSeconds % 60;
      } else {
        clearInterval(this.timerInterval);
        if (!this.submitted) {
          this.submitQuiz(); // Auto-submit on timeout
        }
      }
    }, 1000);
  }

  submitQuiz() {
    this.submitted = true;
    clearInterval(this.timerInterval);

    this.score = this.questions.reduce((total, q, i) => {
      return total + (q.answer === this.answers[i] ? 1 : 0);
    }, 0);

    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    this.timeTaken = `${m}m ${s}s`;
  }

  restartQuiz() {
    this.router.navigate(['/']);
    console.log('try again clicked');
  }
}
