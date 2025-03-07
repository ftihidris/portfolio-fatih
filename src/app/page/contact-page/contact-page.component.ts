import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  constructor(private cd: ChangeDetectorRef, private http: HttpClient) {} // Inject ChangeDetectorRef

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
  iconsContact = [
    {
      name: 'LinkedIn',
      class: 'pi pi-linkedin',
      ariaLabel: 'Open LinkedIn profile',
      action: () =>
        window.open(
          'https://www.linkedin.com/in/fatih-idris-928027268/',
          '_blank'
        ),
      color: 'bg-blue-500/60',
    },
    {
      name: 'WhatsApp',
      class: 'pi pi-whatsapp',
      ariaLabel: 'Send a message on WhatsApp',
      action: () => window.open('https://wa.me/601137873793', '_blank'),
      color: 'bg-green-500/60',
    },
    {
      name: 'GitHub',
      class: 'pi pi-github',
      ariaLabel: 'Open GitHub profile',
      action: () => window.open('https://github.com/ftihidris', '_blank'),
      color: 'bg-purple-500/60',
    },
  ];
}
