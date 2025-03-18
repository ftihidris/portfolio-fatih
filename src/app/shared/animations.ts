import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
} from '@angular/animations';
export const staggerAnimationss = [
  trigger('staggerSections', [
    transition(':enter', [
      query('@staggerElements', stagger(500, animateChild()), {
        optional: true,
      }),
    ]),
  ]),
  trigger('staggerElements', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(100px)' }),
      animate(
        '500ms ease-out',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
  ]),
];

export const staggerAnimations = [
  trigger('staggerSections', [
    transition(':enter', [
      query('@staggerElements', stagger(300, animateChild()), {
        optional: true,
      }),
    ]),
  ]),
  trigger('staggerElements', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate(
        '500ms ease-out',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
  ]),
];
export const fadeInAnimation = trigger('fadeInAnimation', [
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(
      '700ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

export function onRouteChange(state: string): string {
  return state === 'active' ? 'inactive' : 'active';
}
