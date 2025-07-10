import React, { useState } from 'react';
import { object, string } from 'prop-types';
import classNames from 'classnames';
import { truncate } from 'lodash';


import css from './FieldDocumentFile.module.css';
import { formatFileSize } from '../../helper';

const TEXT_LIMIT = 40;

const STATUSES = {
  VERIFIED: 'verified',
  NEW: 'new',
  UPLOADED: 'uploaded',
};

// Cropped "thumbnail" of given listing image.
// The image might be one already uploaded and attached to listing entity
// or representing local image file (before it's uploaded & attached to listing).
const DocumentFile = (props) => {
  const { className, file, intl } = props;

  const [hasDownloadError, setHasDownloadError] = useState(false);
  const [downLoadInProgress, setDownLoadInProgress] = useState(false);

  const classes = classNames(css.listingFile, className, {
    [css.downloadError]: hasDownloadError,
  });

  const { fileName: name, size, contentType: type, isVerified, isNew, key } = file;

  const handleDownload = key
    ? async () => {
        // await downloadFileByKey(key, setDownLoadInProgress, setHasDownloadError);
      }
    : () => {
    };

  const status = isVerified ? STATUSES.VERIFIED : isNew ? STATUSES.NEW : STATUSES.UPLOADED;

  const iconTitle = intl.formatMessage(
    { id: 'DocumentFile.iconTitle' },
    { status }
  );

  const fileNameClass = classNames(css.listingFileName, {
    [css.readyToDownLoad]: !!key,
  });


  return (
    <div className={classes}>
      <div className={css.listingFileIcon}>
        {/* <IconFileImage type={type} /> */}
      </div>
      {downLoadInProgress ? (
        // <Spinner /
        <></>
      ) : (
        <div className={fileNameClass} onClick={handleDownload}>
          {truncate(name, {
            length: TEXT_LIMIT,
            separator: /\s|,|\.|:|;/,
          })}
        </div>
      )}
      <div className={css.listingFileSize}>{formatFileSize(size)}</div>
      <div className={css.iconWrapper} title={iconTitle}>
        {/* {IconComponent && <IconComponent className={css.icon} />} */}
      </div>
    </div>
  );
};

DocumentFile.defaultProps = { className: null };

DocumentFile.propTypes = {
  className: string,
  file: object.isRequired,
  savedFileAltText: string.isRequired,
};

export default DocumentFile;