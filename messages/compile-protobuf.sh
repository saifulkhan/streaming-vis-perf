
#!/bin/sh

# Protocol buffer compiler installation: https://grpc.io/docs/protoc-installation
# Command: protoc -I=./app/models --python_out=./app/models ./app/models/user.proto

# spectrum
protoc -I=. --python_out=. ./spectrum.proto
mv spectrum_pb2.py ../broker/server/models/

# spectrogram
protoc -I=. --python_out=. ./spectrogram.proto
mv spectrogram_pb2.py ../broker/server/models/
