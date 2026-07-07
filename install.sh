#!/bin/bash
# Install the extension

EXTENSION_DIR=~/.local/share/gnome-shell/extensions/resizetopbar@niam0t.github.io

echo "Installing to $EXTENSION_DIR..."
mkdir -p "$EXTENSION_DIR"
cp -r * "$EXTENSION_DIR/"

echo "Compiling schemas..."
glib-compile-schemas "$EXTENSION_DIR/schemas/"

echo "Done! Restart GNOME Shell (Alt+F2, r) and enable the extension."
