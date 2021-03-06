
#!/bin/sh

#
# Protocol buffer compiler installation: https://grpc.io/docs/protoc-installation
# Command: protoc -I=./app/models --python_out=./app/models ./app/models/user.proto
#

# spectrum
protoc -I=. --python_out=. ./spectrum.proto
mv spectrum_pb2.py ../app/models/protobuf/

# spectrogram
protoc -I=. --python_out=. ./spectrogram.proto
mv spectrogram_pb2.py ../app/models/protobuf/


#
# ProtoBuf JS installation, see [doc](https://www.npmjs.com/package/protobufjs).
# npm install protobufjs -g
#
npm install protobufjs -g

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
