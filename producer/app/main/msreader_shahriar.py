#  In a MeasurementSet Table, at each time_stamp, we have num_baseline rows. In the data column in each row
#  we have num_freqs channel and 4 polarisations for each channel. The getcol function will return a numpy
#  array, where the first argument is the column name ('DATA' returns the visibility values), the second
#  argument is the start row, the third one the number of rows to be selected, and the fourth argument is
#  the increment


import casacore.tables as tables
import numpy as np
import cmath

# vis = tables.table('/mnt/RFI1/MeerKAT/Nest200047/1643124898_sdp_l0.ms')
vis = tables.table(
    "/home/saifulkhan/CODE/SKA/ska-sdp-qa-metric-generator/metric-generator/data-meerkat/1643124898_sdp_l0.ms"
)

num_rows = vis.nrows()
num_baselines = 1830
num_time = 2321
num_freqs = 4096
num_antennas = 60

# time_stamp should be smaller than num_time
time_stamp = 1485

# baseline_id should be smaller than  nun_baselines (ids 0 to 59 are autocorrelation)
baseline_id = 742

# pol_id should be 0, 1, 2, or 3
pol_id = 0

# row_number  is found based on time_stamp and baseline_id
row_number = time_stamp * num_baselines + baseline_id
vis_for_baseline_timestamp = vis.getcol("DATA", row_number, 1)
vis_abs = np.zeros(num_freqs)
vis_phase = np.zeros(num_freqs)

vis_abs = abs(vis_for_baseline_timestamp)
vis_phase = np.angle(vis_for_baseline_timestamp)


print("vis_abs = ", vis_abs)
print("vis_phase = ", vis_phase)

####################################################

baseline_id = 124
pol_id = 3

time_period = num_time

vis_spectro = vis.getcol("DATA", baseline_id, time_period, num_baselines)

spectrogram = vis_spectro[:, :, pol_id]

spectro_abs = abs(spectrogram)
spectro_phase = np.angle(spectrogram)

print("spectro_abs = ", spectro_abs)
print("spectro_phase = ", spectro_phase)

print("shape of abs: ", spectro_abs.shape)
print("shape of phase", spectro_phase.shape)
