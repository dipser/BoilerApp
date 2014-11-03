# Wie benutzt man diese Datei?
# [Mac] Per Terminal "sh combine.command" oder erstelle eine klickbare Datei mit "chmod +x combine.command"


# Erstellt eine kombinierte Datei
cd "`dirname "$0"`"
cat mixins/*.less > mixins.combined.less

