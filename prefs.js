import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk?version=4.0';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ExamplePreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const page = new Adw.PreferencesPage({ title: 'General', icon_name: 'preferences-system-symbolic' });
    window.add(page);

    const group = new Adw.PreferencesGroup({ title: 'Appearance', description: 'Customize the top bar' });
    page.add(group);

    const row = new Adw.ActionRow({ title: 'Panel Height', subtitle: 'Set the height of the top bar in pixels' });
    group.add(row);

    const spinButton = Gtk.SpinButton.new_with_range(20, 100, 1);
    spinButton.valign = Gtk.Align.CENTER;

    const settings = this.getSettings();
    settings.bind('panel-height', spinButton, 'value', Gio.SettingsBindFlags.DEFAULT);

    row.add_suffix(spinButton);
    row.activatable_widget = spinButton;
  }
}
