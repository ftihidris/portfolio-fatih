import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PortfolioService } from '../../service/portfolio.service';

@Component({
  selector: 'app-contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent implements OnInit {
  connectMe: {
    name: string;
    class: string;
    action: () => void;
    color: string;
    ariaLabel: string;
  }[] = [];
  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private portfolioService: PortfolioService
  ) {} // Inject ChangeDetectorRef
  ngOnInit() {
    this.connectMe = this.portfolioService.getConnectMe();
  }

  onInputChange() {
    setTimeout(() => {
      this.cd.detectChanges(); // Trigger Angular change detection
    }, 100);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.forceValidationUpdate();
    }, 500);
  }

  forceValidationUpdate() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input.matches(':-webkit-autofill')) {
        input.dispatchEvent(new Event('input')); // Trigger Angular form validation
      }
    });
  }

  onSubmit(contactForm: any) {
    if (!contactForm.valid) {
      alert('Please fill in all fields correctly.');
      return; // Stop submission
    }

    const formData = {
      name: contactForm.value.name,
      email: contactForm.value.email,
      tel: contactForm.value.tel,
      message: contactForm.value.message,
    };

    this.http.post(environment.formspreeUrl, formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        alert('Thank you! I will get in touch with you as soon as possible.');
        this.clearForm(contactForm);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        alert('Oops! Something went wrong. Please try again later.');
      },
    });
  }

  clearForm(contactForm: any) {
    contactForm.resetForm(); // Properly reset form
  }
}
