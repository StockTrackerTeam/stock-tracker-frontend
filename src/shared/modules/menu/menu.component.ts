import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  @ViewChild(CdkConnectedOverlay)
  connectedOverlay!: CdkConnectedOverlay;

  private _isOpen = new BehaviorSubject<boolean>(false);

  triggerRef!: ElementRef<HTMLElement>;
  positions!: ConnectedPosition[];
  origin!: CdkOverlayOrigin;
  elementRect!: DOMRect;

  readonly isOpen$ = this._isOpen.pipe(distinctUntilChanged());

  get isOpen() { return this._isOpen.value; }

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.positions = [
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 5
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: 5
      }
    ];
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    if (!this.isOpen) {
      this.origin = new CdkOverlayOrigin(this.triggerRef);
      this.elementRect = this.triggerRef.nativeElement.getBoundingClientRect();
      this._isOpen.next(true);
      this.cdr.markForCheck();
    }
  }

  close(): void {
    if (this.isOpen) {
      this._isOpen.next(false);
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this.isOpen) {
      const target = event.target as Element;
      const originEl = this.triggerRef.nativeElement;

      if (this.notIn(originEl, target)) {
        this.close();
      }
    }
  }

  private notIn(el: HTMLElement, target: Element): boolean {
    return el !== target && !el.contains(target);
  }
}
