
#!/bin/sh

# spectrum
protoc -I=. --python_out=. ./spectrum.proto
mv spectrum_pb2.py ../src/protobuf

# spectrogram
protoc -I=. --python_out=. ./spectrogram.proto
mv spectrogram_pb2.py ../src/protobuf


# spectrum
pbjs -t static-module -w commonjs -o spectrum.js spectrum.proto
pbts -o spectrum.d.ts spectrum.js
mv spectrum.js ../../visualisation/src/models/protobuf/
mv spectrum.d.ts ../../visualisation/src/types/

# spectrogram
pbjs -t static-module -w commonjs -o spectrogram.js spectrogram.proto
pbts -o spectrogram.d.ts spectrogram.js
mv spectrogram.js ../../visualisation/src/models/protobuf
mv spectrogram.d.ts ../../visualisation/src/types/
