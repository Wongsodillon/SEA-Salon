<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Service;
use App\Models\ServiceDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function GetBranchByProvince(Request $request) {
        $province = $request->province;
        if ($province == 'Select province') {
            return null;
        }
        $branches = Branch::where('branch_province', $province)->with(['ServiceDetails.Service'])->get();
        return $branches;
    }
    public function GetBranches() {
        $branches = Branch::with(['ServiceDetails.Service'])->get();
        return Inertia::render('Admin/Branches', ['branches' => $branches]);
    }

    public function AddBranch() {
        $services = Service::all();
        return Inertia::render('Admin/AddBranch', [
            'services' => $services,
        ]);
    }

    public function CreateBranch(Request $request) {
        $messages = [
            'branch_name.required' => 'Branch name is required',
            'branch_name.unique' => 'Branch name already exists',
            'branch_phone.required' => 'Branch phone is required',
            'branch_phone.starts_with' => 'Branch phone must start with 021',
            'opening_time.required' => 'Opening time is required',
            'closing_time.required' => 'Closing time is required',
            'opening_time.before' => 'Opening time must be before the closing time',
            'branch_street.required' => 'Branch street is required',
            'branch_city.required' => 'Branch city is required',
            'branch_province.required' => 'Branch province is required',
            'branch_image.required' => 'Branch image is required',
            'branch_image.image' => 'Branch image must be an image',
            'branch_image.mimes' => 'Branch image must be a jpeg, jpg, png, bmp, or gif',
            'branch_image.max' => 'Branch image must be less than 2MB',
            'services.required' => 'Services are required',
            'services.*.price.min' => 'Service price must be greater than 0',
            'services.*.duration.min' => 'Service duration must be at least 1',
        ];
        $rules = [
            'branch_name' => "required|unique:".Branch::class,
            'branch_phone' => 'required|starts_with:021',
            'opening_time' => 'required',
            'closing_time' => 'required',
            'opening_time' => 'required|before:closing_time',
            'branch_street' => 'required',
            'branch_city' => 'required',
            'branch_province' => 'required',
            'branch_image' => 'required|image|mimes:jpeg,jpg,png,bmp,gif|max:2048',
            'services' => 'required',
            'services.*.price' => 'required|numeric|min:1',
            'services.*.duration' => 'required|integer|min:1',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $branch = new Branch();
        $branch->branch_name = $request->branch_name;
        $branch->branch_phone = $request->branch_phone;
        $branch->opening_time = $request->opening_time;
        $branch->closing_time = $request->closing_time;
        $branch->branch_street = $request->branch_street;
        $branch->branch_city = $request->branch_city;
        $branch->branch_province = $request->branch_province;
        $branch->branch_image = $this->InsertFile($request->file('branch_image'));
        $branch->save();
        foreach($request->services as $service) {
            $service_details = new ServiceDetails();
            $service_details->branch_id = $branch->id;
            $service_details->service_id = $service['service_id'];
            $service_details->price = $service['price'];
            $service_details->duration = $service['duration'];
            $service_details->save();
        }

        return redirect()->route('admin.branches');
    }

    public function EditBranch(Request $request) {
        $branch = Branch::with(['ServiceDetails.Service'])->find($request->id);
        $services = Service::all();
        return Inertia::render('Admin/AddBranch', [
            'branch' => $branch,
            'services' => $services,
        ]);
    }

    public function UpdateBranch(Request $request) {
        $branch = Branch::find($request->id);
        $messages = [
            'branch_name.required' => 'Branch name is required',
            'branch_name.unique' => 'Branch name already exists',
            'branch_phone.required' => 'Branch phone is required',
            'branch_phone.starts_with' => 'Branch phone must start with 021',
            'opening_time.required' => 'Opening time is required',
            'closing_time.required' => 'Closing time is required',
            'opening_time.before' => 'Opening time must be before the closing time',
            'branch_street.required' => 'Branch street is required',
            'branch_city.required' => 'Branch city is required',
            'branch_province.required' => 'Branch province is required',
            'branch_image.image' => 'Branch image must be an image',
            'branch_image.mimes' => 'Branch image must be a jpeg, jpg, png, bmp, or gif',
            'branch_image.max' => 'Branch image must be less than 2MB',
            'services.required' => 'Services are required',
            'services.*.price.min' => 'Service price must be greater than 0',
            'services.*.duration.min' => 'Service duration must be at least 1',
        ];
        $rules = [
            'branch_name' => "required",
            'branch_phone' => 'required|starts_with:021',
            'opening_time' => 'required',
            'closing_time' => 'required',
            'opening_time' => 'required|before:closing_time',
            'branch_street' => 'required',
            'branch_city' => 'required',
            'branch_province' => 'required',
            'services' => 'required',
            'services.*.price' => 'required|numeric|min:1',
            'services.*.duration' => 'required|numeric|min:1',
        ];
        if ($request->hasFile('branch_image')) {
            $rules['branch_image'] = 'image|mimes:jpeg,jpg,png,bmp,gif|max:2048';
        }
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $branch->branch_name = $request->branch_name;
        $branch->branch_phone = $request->branch_phone;
        $branch->opening_time = $request->opening_time;
        $branch->closing_time = $request->closing_time;
        $branch->branch_street = $request->branch_street;
        $branch->branch_city = $request->branch_city;
        $branch->branch_province = $request->branch_province;
        if ($request->hasFile('branch_image')) {
            $this->DeleteFile($branch->branch_image);
            $branch->branch_image = $this->InsertFile($request->file('branch_image'));
        }
        $branch->save();
        $branch->ServiceDetails()->delete();
        foreach($request->services as $service) {
            $service_details = new ServiceDetails();
            $service_details->branch_id = $branch->id;
            $service_details->service_id = $service['service_id'];
            $service_details->price = $service['price'];
            $service_details->duration = $service['duration'];
            $service_details->save();
        }
        return redirect()->route('admin.branches');
    }

    public function InsertFile($file) {
        $fileName = time().'_'.$file->getClientOriginalName();
        Storage::putFileAs('public/branches', $file, $fileName);
        return Storage::url('branches/'.$fileName);
    }

    public function DeleteFile($path) {
        $path = str_replace('/storage', '', $path);
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}


