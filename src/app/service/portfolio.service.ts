import { inject, Injectable, NgZone } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private firestore = inject(Firestore);
  private zone = inject(NgZone);

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private fetchCollection(collectionName: string): Observable<any[]> {
    const colRef = collection(this.firestore, collectionName);
    return collectionData(colRef, { idField: 'id' }).pipe(
      map((data) => {
        return this.zone.run(() => data);
      })
    );
  }
  getAboutCards(): Observable<any[]> {
    return this.fetchCollection('aboutCards');
  }

  getCertsCards(): Observable<any[]> {
    return this.fetchCollection('certsCards');
  }

  getIconsContact() {
    return this.iconsContact;
  }

  getCameliaNotes(): Observable<any[]> {
    return this.fetchCollection('cameliaNotes');
  }

  getCameliaSkill(): Observable<any[]> {
    return this.fetchCollection('cameliaSkill');
  }
  getVote2uSkill(): Observable<any[]> {
    return this.fetchCollection('vote2uSkill');
  }

  getVote2uNotes(): Observable<any[]> {
    return this.fetchCollection('vote2uNotes');
  }

  getProjectCards(): Observable<any[]> {
    return this.fetchCollection('projectCards');
  }

  getIconsSkill(): Observable<any[]> {
    return this.fetchCollection('iconsSkill');
  }

  getArtzSkill(): Observable<any[]> {
    return this.fetchCollection('artzSkill');
  }

  getArtzNotes(): Observable<any[]> {
    return this.fetchCollection('artzNotes');
  }

  getReferenceCards(): Observable<any[]> {
    return this.fetchCollection('referenceCards');
  }

  getExperienceCards(): Observable<any[]> {
    return this.fetchCollection('experienceCards');
  }

  getParticipateCards(): Observable<any[]> {
    return this.fetchCollection('participateCards');
  }

  copyToClipboard(value: string): void {
    this.playBeep();
    // Copy to clipboard
    navigator.clipboard.writeText(value).then(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copied',
          detail: `${value}`,
        });
      },
      (err) => console.error('Could not copy text:', err)
    );
  }

  playBeep(): void {
    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2824, audioCtx.currentTime);

    const linearGain = Math.pow(10, -10.93 / 20);
    gainNode.gain.setValueAtTime(linearGain, audioCtx.currentTime);

    gainNode.gain.linearRampToValueAtTime(
      linearGain,
      audioCtx.currentTime + 0.0
    );
    gainNode.gain.linearRampToValueAtTime(
      linearGain * 0.75,
      audioCtx.currentTime + 0.0174
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.4914
    );

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
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
      name: 'Email',
      class: 'pi pi-envelope',
      ariaLabel: 'Send an email',
      action: () => this.copyToClipboard('fatihidris13@gmail.com'),
      color: 'bg-red-500/60',
    },
  ];
}

// vote2uNotes = [
//   {
//     title: 'Status',
//     name: 'Student',
//     color: 'bg-pink-500/50',
//     cardColor: 'bg-blue-100/60',
//   },
//   {
//     title: 'Roles',
//     name: 'Full Stack Developer',
//     color: 'bg-purple-500/50',
//     cardColor: 'bg-purple-100/60',
//   },
//   {
//     title: 'For',
//     name: 'Final Year Project',
//     color: 'bg-orange-500/50',
//     cardColor: 'bg-orange-100/60',
//   },
// ];

// vote2uSkill = [
//   {
//     name: 'Dart',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Solidity',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'UI/UX Design',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Flutter',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Firebase',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Remix IDE',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Figma',
//     level: 'Beginner',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'iOS',
//     level: 'Beginner',
//     color: 'bg-yellow-500/50',
//   },

//   {
//     name: 'Android',
//     level: 'Intermedia',
//     color: 'bg-yellow-500/50',
//   },
//   {
//     name: 'Blockchain',
//     level: 'Intermediate',
//     color: 'bg-yellow-500/50',
//   },
//   {
//     name: 'Smart Contract',
//     level: 'Intermediate',
//     color: 'bg-yellow-500/50',
//   },
// ];

// cameliaNotes = [
//   {
//     title: 'Status',
//     name: 'Internship',
//     color: 'bg-pink-500/50',
//     cardColor: 'bg-blue-100/60',
//   },
//   {
//     title: 'Roles',
//     name: 'Front End Developer',
//     color: 'bg-purple-500/50',
//     cardColor: 'bg-purple-100/60',
//   },
//   {
//     title: 'Company',
//     name: 'TM Research & Development',
//     color: 'bg-orange-500/50',
//     cardColor: 'bg-orange-100/60',
//   },
// ];

// cameliaSkill = [
//   {
//     name: 'HTML',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'CSS',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },

//   {
//     name: 'TypeScript',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },

//   {
//     name: 'JavaScript',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'UI/UX Design',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Angular',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Sketch',
//     level: 'Beginner',
//     color: 'bg-red-500/50',
//   },
// ];
//
//   certsCards = [
//     {
//       name: 'Introduction to Android Studio Course',
//       publisher: 'Simplilearn',
//       credential: '4963546',
//       url: 'https://simpli-web.app.link/e/mbUaskU8kIb',
//       src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/certs%2Fandroid.webp?alt=media&token=847f52c9-9dea-43c9-a38b-3d667e4da1b3',
//       alt: 'Android Studio Certificate',
//       date: '03/2024',
//     },
//     {
//       name: 'Introduction to Flutter Course',
//       publisher: 'Simplilearn',
//       credential: '4963155',
//       url: 'https://simpli-web.app.link/e/C2dPjKW8kIb',
//       src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/certs%2Fflutter.webp?alt=media&token=2e81dbbc-b275-4dff-b9c1-f019347126e8',
//       alt: 'Flutter Certificate',
//       date: '03/2024',
//     },
//     {
//       name: 'Angular Basics',
//       publisher: 'Simplilearn',
//       credential: '7521143',
//       url: 'https://simpli-web.app.link/e/nLwtSsDbfOb',
//       src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/certs%2Fangular.webp?alt=media&token=3f369c7a-3507-4e64-a60e-fc279e36d7ad',
//       alt: 'Angular Certificate',
//       date: '11/2024',
//     },
//     {
//       name: 'Git Training',
//       publisher: 'Simplilearn',
//       credential: '4993208',
//       url: 'https://simpli-web.app.link/e/SACnqyA8kIb',
//       src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/certs%2Fgit.webp?alt=media&token=d9d9225e-d9eb-494b-a757-fc7cc7a8751a',
//       alt: 'Git Certificate',
//       date: '03/2024',
//     },
//     {
//       name: 'Introduction to Internet of Things',
//       publisher: 'Cisco Networking Academy',
//       credential: '',
//       url: 'https://www.credly.com/badges/2cc4f804-c2ad-4508-a262-a21b9e87d5ce/print',
//       src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/certs%2Fgit.webp?alt=media&token=d9d9225e-d9eb-494b-a757-fc7cc7a8751a',
//       alt: 'IoT Certificate',
//       date: '06/2024',
//     },
//     {
//       name: 'UI/UX for Beginners',
//       publisher: 'Great Learning',
//       credential: 'IKRSCZHR',
//       url: 'https://www.mygreatlearning.com/certificate/IKRSCZHR',
//       src: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/certs%2Fui-ux.webp?alt=media&token=4e38c99f-ee8c-4379-9517-b541cb2fd121',
//       alt: 'UI/UX Certificate',
//       date: '06/2024',
//     },
//   ];
// }

// certsCards = [
//   {
//     name: 'Introduction to Android Studio Course',
//     publisher: 'Simplilearn',
//     credential: '4963546',
//     url: 'https://simpli-web.app.link/e/mbUaskU8kIb',
//     src: 'assets/certs/android.webp',
//     alt: 'Android Studio Certificate',
//     date: '03/2024',
//   },
//   {
//     name: 'Introduction to Flutter Course',
//     publisher: 'Simplilearn',
//     credential: '4963155',
//     url: 'https://simpli-web.app.link/e/C2dPjKW8kIb',
//     src: 'assets/certs/flutter.webp',
//     alt: 'Flutter Certificate',
//     date: '03/2024',
//   },
//   {
//     name: 'Angular Basics',
//     publisher: 'Simplilearn',
//     credential: '7521143',
//     url: 'https://simpli-web.app.link/e/nLwtSsDbfOb',
//     src: 'assets/certs/angular.webp',
//     alt: 'Angular Certificate',
//     date: '11/2024',
//   },
//   {
//     name: 'Git Training',
//     publisher: 'Simplilearn',
//     credential: '4993208',
//     url: 'https://simpli-web.app.link/e/SACnqyA8kIb',
//     src: 'assets/certs/git.webp',
//     alt: 'Git Certificate',
//     date: '03/2024',
//   },
//   {
//     name: 'Introduction to Internet of Things',
//     publisher: 'Cisco Networking Academy',
//     credential: '',
//     url: 'https://www.credly.com/badges/2cc4f804-c2ad-4508-a262-a21b9e87d5ce/print',
//     src: 'assets/certs/iot.webp',
//     alt: 'IoT Certificate',
//     date: '06/2024',
//   },
//   {
//     name: 'UI/UX for Beginners',
//     publisher: 'Great Learning',
//     credential: 'IKRSCZHR',
//     url: 'https://www.mygreatlearning.com/certificate/IKRSCZHR',
//     src: 'assets/certs/ui-ux.webp',
//     alt: 'UI/UX Certificate',
//     date: '06/2024',
//   },
// ];

// //homepage
// aboutCards = [
//   {
//     about: 'Degree',
//     roles: 'Bachelor in Computer Science',
//     notes: '(Hons) Mobile Computing',
//     when: '10/2021 - 02/2025',
//     icon: 'assets/logo/uitm-logo.svg',
//     alt: 'Logo UiTM',
//     color: 'bg-purple-500/50',
//     iconColor: 'bg-purple-100/70',
//   },
//   {
//     about: 'Internship',
//     roles: 'TM Research & Development',
//     notes: 'Front End Developer',
//     when: '09/2024 - 02/2025',
//     icon: 'assets/logo/tmrnd-logo.svg',
//     alt: 'Logo TM R&D',
//     color: 'bg-orange-500/50',
//     iconColor: 'bg-orange-100/70',
//   },
//   {
//     about: 'Freelance',
//     roles: 'Graphic Designer',
//     notes: 'Printing Industry',
//     when: '2021 - 2025',
//     icon: 'assets/logo/artz-logo.svg',
//     alt: 'Logo Artzology',
//     color: 'bg-red-500/50',
//     iconColor: 'bg-red-100/70',
//   },
// ];

// projectCards = [
//   {
//     name: 'Camelia.active',
//     when: 'Internship',
//     roles: 'Frontend Developer',
//     icon: 'assets/logo/camelia-active.svg',
//     color: 'bg-purple-500/50',
//     iconColor: 'bg-orange-100/70',
//   },
//   {
//     name: 'Camelia',
//     when: 'Internship',
//     roles: 'UI/UX Designer',
//     icon: 'assets/logo/camelia-active.svg',
//     color: 'bg-fuchsia-500/50',
//     iconColor: 'bg-orange-100/70',
//   },
//   {
//     name: 'Vote2U',
//     when: 'Final Year Project',
//     roles: 'Fullstack Developer',
//     icon: 'assets/logo/vote2u.svg',
//     color: 'bg-indigo-500/50',
//     iconColor: 'bg-purple-100/70',
//   },
// ];

// iconsSkill = [
//   {
//     name: 'Dart',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'HTML',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'CSS',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'TypeScript',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Solidity',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Kotlin',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Java',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'C++',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Swift',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Python',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },

//   {
//     name: 'Web',
//     level: 'Intermediate',
//     color: 'bg-pink-500/50',
//   },
//   {
//     name: 'Android',
//     level: 'Intermediate',
//     color: 'bg-pink-500/50',
//   },
//   {
//     name: 'UI/UX',
//     level: 'Intermediate',
//     color: 'bg-pink-500/50',
//   },
//   {
//     name: 'iOS',
//     level: 'Beginner',
//     color: 'bg-pink-500/50',
//   },

//   {
//     name: 'Flutter',
//     level: 'Intermediate',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'Angular',
//     level: 'Intermediate',
//     color: 'bg-indigo-500/50',
//   },

//   {
//     name: 'Remix IDE',
//     level: 'Intermediate',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'GitHub',
//     level: 'Intermediate',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'RapidMiner',
//     level: 'Beginner',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'Android Studio',
//     level: 'Beginner',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'MongoDB',
//     level: 'Beginner',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'Tableau',
//     level: 'Beginner',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'Xcode',
//     level: 'Beginner',
//     color: 'bg-indigo-500/50',
//   },
//   {
//     name: 'Illustrator',
//     level: 'Advanced',
//     color: 'bg-fuchsia-500/50',
//   },
//   {
//     name: 'Sketch',
//     level: 'Advanced',
//     color: 'bg-fuchsia-500/50',
//   },
//   {
//     name: 'Figma',
//     level: 'Inrtermediate',
//     color: 'bg-fuchsia-500/50',
//   },
//   {
//     name: 'Photoshop',
//     level: 'Beginner',
//     color: 'bg-fuchsia-500/50',
//   },
// ];

// //about

// experienceCards = [
//   {
//     experience: 'Mobile Development',
//     when: '1 Years',
//     roles: 'Dart, Kotlin, Java, Swift',
//     class: 'phone_iphone',
//     color: 'bg-fuchsia-500/50',
//     cardColor: 'bg-fuchsia-100/60',
//     iconColor: 'text-fuchsia-800/70',
//   },
//   {
//     experience: 'Web Development',
//     when: 'Less than 1 Year',
//     roles: 'HTML, CSS, JavaScript, TypeScript',
//     class: 'globe',
//     color: 'bg-purple-500/50',
//     cardColor: 'bg-purple-100/60',
//     iconColor: 'text-purple-800/70',
//   },
//   {
//     experience: 'UI/UX Design',
//     when: '1 Years',
//     roles: 'Sketch, Figma, Miro',
//     class: 'design_services',
//     color: 'bg-blue-500/50',
//     cardColor: 'bg-blue-100/60',
//     iconColor: 'text-blue-800/70',
//   },
//   {
//     experience: 'Graphic Design',
//     when: '5 Years',
//     roles: 'Adobe Illustrator, Adobe Photoshop',
//     class: 'draw',
//     color: 'bg-red-500/50',
//     cardColor: 'bg-red-100/60',
//     iconColor: 'text-red-800/70',
//   },
// ];

// //vote2u
// vote2uNotes = [
//   {
//     title: 'Status',
//     name: 'Student',
//     color: 'bg-pink-500/50',
//     cardColor: 'bg-blue-100/60',
//   },
//   {
//     title: 'Roles',
//     name: 'Full Stack Developer',
//     color: 'bg-purple-500/50',
//     cardColor: 'bg-purple-100/60',
//   },
//   {
//     title: 'For',
//     name: 'Final Year Project',
//     color: 'bg-orange-500/50',
//     cardColor: 'bg-orange-100/60',
//   },
// ];

// vote2uSkill = [
//   {
//     name: 'Dart',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Solidity',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'UI/UX Design',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Flutter',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Firebase',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Remix IDE',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Figma',
//     level: 'Beginner',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'iOS',
//     level: 'Beginner',
//     color: 'bg-yellow-500/50',
//   },

//   {
//     name: 'Android',
//     level: 'Intermedia',
//     color: 'bg-yellow-500/50',
//   },
//   {
//     name: 'Blockchain',
//     level: 'Intermediate',
//     color: 'bg-yellow-500/50',
//   },
//   {
//     name: 'Smart Contract',
//     level: 'Intermediate',
//     color: 'bg-yellow-500/50',
//   },
// ];

// //camelia
// cameliaNotes = [
//   {
//     title: 'Status',
//     name: 'Internship',
//     color: 'bg-pink-500/50',
//     cardColor: 'bg-blue-100/60',
//   },
//   {
//     title: 'Roles',
//     name: 'Front End Developer',
//     color: 'bg-purple-500/50',
//     cardColor: 'bg-purple-100/60',
//   },
//   {
//     title: 'Company',
//     name: 'TM Research & Development',
//     color: 'bg-orange-500/50',
//     cardColor: 'bg-orange-100/60',
//   },
// ];

// cameliaSkill = [
//   {
//     name: 'HTML',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'CSS',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },

//   {
//     name: 'TypeScript',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },

//   {
//     name: 'JavaScript',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'UI/UX Design',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Angular',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Sketch',
//     level: 'Beginner',
//     color: 'bg-red-500/50',
//   },
// ];

// //artz
// artzNotes = [
//   {
//     title: 'Status',
//     name: 'Freelance',
//     color: 'bg-pink-500/50',
//     cardColor: 'bg-blue-100/60',
//   },
//   {
//     title: 'Roles',
//     name: 'Graphic Designer',
//     color: 'bg-purple-500/50',
//     cardColor: 'bg-purple-100/60',
//   },
//   {
//     title: 'Company',
//     name: 'Artzology',
//     color: 'bg-orange-500/50',
//     cardColor: 'bg-orange-100/60',
//   },
// ];

// artzSkill = [
//   {
//     name: 'Business Intelligence',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },

//   {
//     name: 'Payment Gateway',
//     level: 'Beginner',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Vector Design',
//     level: 'Intermediate',
//     color: 'bg-purple-500/50',
//   },
//   {
//     name: 'Canva',
//     level: 'Intermediate',
//     color: 'bg-red-500/50',
//   },
//   {
//     name: 'Adobe Illustrator',
//     level: 'Advanced',
//     color: 'bg-red-500/50',
//   },
// ];
// }
