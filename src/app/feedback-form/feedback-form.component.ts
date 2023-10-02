import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  questions = [
    { question: 'Trainer Name', isRating: false },
    { question: 'Evaluator Name', isRating: false },
    { question: 'Date', isRating: false },
    { question: 'Day', isRating: false },
    { question: 'Course', isRating: false },
    { question: 'Topic', isRating: false },
    {question: "Content Mastery", isRating: true},
    {question: "Lesson Planning", isRating: true},
    {question: "Communication Skill", isRating: true},
    {question: "Confidence", isRating: true},
    {question: "Query Resolution", isRating: true},
    {question: "Time Management", isRating: true},
    {question: "Practicle Approach", isRating: true},
    {question: "Innovation and Creativity", isRating: true},
    {question: "Problem solving guidence", isRating: true},
    {question: "Use of Technology", isRating: true},
    {question: "Additional Comments", isRating: true},
  ];
  constructor() {}

  ngOnInit(): void {}
}
