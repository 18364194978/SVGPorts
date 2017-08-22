/*! Rappid v1.7.1 - HTML5 Diagramming Framework

Copyright (c) 2015 client IO

 2016-03-03 


This Source Code Form is subject to the terms of the Rappid Academic License
, v. 1.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_academic_v1.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


// Routes the link always to/from a certain side
//
// Arguments:
//   padding ... gap between the element and the first vertex. :: Default 40.
//   side ... 'left' | 'right' | 'top' | 'bottom' :: Default 'bottom'.
//
joint.routers.oneSide = function(vertices, opt, linkView) {

    var side = opt.side || 'bottom';
    var padding = opt.padding || 40;

    // LinkView contains cached source an target bboxes.
    // Note that those are Geometry rectangle objects.
    var sourceBBox = linkView.sourceBBox;
    var targetBBox = linkView.targetBBox;
    var sourcePoint = sourceBBox.center();
    var targetPoint = targetBBox.center();

    var coordinate, coordinateValue, dimension, direction;

    switch (side) {
        case 'bottom':
            direction = 1;
            coordinate = 'y';
            dimension = 'height';
            break;
        case 'top':
            direction = -1;
            coordinate = 'y';
            dimension = 'height';
            break;
        case 'left':
            direction = -1;
            coordinate = 'x';
            dimension = 'width';
            break;
        case 'right':
            direction = 1;
            coordinate = 'x';
            dimension = 'width';
            break;
        default:
            throw new Error('Router: invalid side');
    }

    // move the points from the center of the element to outside of it.
    sourcePoint[coordinate] += direction * (sourceBBox[dimension] / 2 + padding);
    targetPoint[coordinate] += direction * (targetBBox[dimension] / 2 + padding);

    // make link orthogonal (at least the first and last vertex).
    if (direction * (sourcePoint[coordinate] - targetPoint[coordinate]) > 0) {
        targetPoint[coordinate] = sourcePoint[coordinate];
    } else {
        sourcePoint[coordinate] = targetPoint[coordinate];
    }

    return [sourcePoint].concat(vertices, targetPoint);
};
