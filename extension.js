/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class ResizeTopBarExtension extends Extension {
  enable() {
    this._settings = this.getSettings();
    const newHeight = this._settings.get_int('panel-height');

    const panel = Main.panel;
    this._originalHeight = panel.height;

    panel.height = newHeight;
    panel.style = `height: ${newHeight}px;`;

    this._settingsChangedId = this._settings.connect('changed::panel-height', () => {
      const updatedHeight = this._settings.get_int('panel-height');
      const panel = Main.panel;
      panel.height = updatedHeight;
      panel.style = `height: ${updatedHeight}px;`;
    });
  }

  disable() {
    if (this._settingsChangedId) {
      this._settings.disconnect(this._settingsChangedId);
      this._settingsChangedId = 0;
    }

    if (this._settings) {
      this._settings = null;
    }

    const panel = Main.panel;
    if (this._originalHeight) {
      panel.height = this._originalHeight;
      panel.style = `height: ${this._originalHeight}px;`;
      this._originalHeight = null;
    }
  }
}
