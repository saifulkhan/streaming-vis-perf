# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: spectrum.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0espectrum.proto\"\xa6\x01\n\x08Spectrum\x12\x11\n\ttimestamp\x18\x01 \x01(\t\x12\r\n\x05x_min\x18\x02 \x01(\r\x12\r\n\x05x_max\x18\x03 \x01(\r\x12\r\n\x05y_min\x18\x04 \x01(\r\x12\r\n\x05y_max\x18\x05 \x01(\r\x12\x14\n\x08\x63hannels\x18\x06 \x03(\rB\x02\x10\x01\x12\x11\n\x05power\x18\x07 \x03(\x02\x42\x02\x10\x01\x12\x10\n\x04sd_l\x18\x08 \x03(\x02\x42\x02\x10\x01\x12\x10\n\x04sd_u\x18\t \x03(\x02\x42\x02\x10\x01\x62\x06proto3')



_SPECTRUM = DESCRIPTOR.message_types_by_name['Spectrum']
Spectrum = _reflection.GeneratedProtocolMessageType('Spectrum', (_message.Message,), {
  'DESCRIPTOR' : _SPECTRUM,
  '__module__' : 'spectrum_pb2'
  # @@protoc_insertion_point(class_scope:Spectrum)
  })
_sym_db.RegisterMessage(Spectrum)

if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _SPECTRUM.fields_by_name['channels']._options = None
  _SPECTRUM.fields_by_name['channels']._serialized_options = b'\020\001'
  _SPECTRUM.fields_by_name['power']._options = None
  _SPECTRUM.fields_by_name['power']._serialized_options = b'\020\001'
  _SPECTRUM.fields_by_name['sd_l']._options = None
  _SPECTRUM.fields_by_name['sd_l']._serialized_options = b'\020\001'
  _SPECTRUM.fields_by_name['sd_u']._options = None
  _SPECTRUM.fields_by_name['sd_u']._serialized_options = b'\020\001'
  _SPECTRUM._serialized_start=19
  _SPECTRUM._serialized_end=185
# @@protoc_insertion_point(module_scope)